# ClinSync Frontend Client 💻

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Sonner](https://img.shields.io/badge/Sonner_Toasts-orange?style=for-the-badge&logo=toast)](https://github.com/emilkowalski/sonner)
[![BroadcastChannel API](https://img.shields.io/badge/Broadcast_Channel-blueviolet?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)

A premium, state-of-the-art Single Page Application (SPA) serving as the user portal and medical dashboard for **ClinSync**. Engineered using **React, Vite, and TypeScript**, it delivers a clinical user experience, featuring responsive dashboards, real-time inter-tab sync, and smooth micro-animations.

---

## 🔬 Clinical User Experience (UX)

ClinSync's UI is custom-tailored to minimize friction in high-stress medical environments:
* **Matte-Surface Design Language:** Curated HSL color palette utilizing clean backgrounds (`#F8FAFC`), structural `1px` slate borders, and vibrant indicators.
* **Informative State Feedbacks:** Instant visual translation of raw API enum codes (`VALIDATED_BY_RECEPTION`, `NO_SHOW`, etc.) into intuitive Spanish status badges.
* **Optimistic Controls & Loaders:** Prevent duplicate actions by automatically disabling action buttons during pending mutations.

---

## 🏗️ Dual-Mode Architecture (Mock / Real API)

To enable developers to work offline or test flows without a database connection, ClinSync incorporates a service-level **Dual-Mode Fallback System** governed by `appConfig.useMocks`.

### Data Flow Diagram
```text
           ┌──────────────────────────────────────────────┐
           │                  React Page                  │
           │           (MyAppointments / Book)            │
           └──────────────────────┬───────────────────────┘
                                  │
                       ┌──────────▼──────────┐
                       │   TanStack Query    │ (Server State Cache)
                       │   Hooks / Mutations │
                       └──────────┬──────────┘
                                  │
                       ┌──────────▼──────────┐
                       │   Service Abstraction│ (e.g. appointment.service.ts)
                       └──────────┬──────────┘
                                  │
                     🚀 Is VITE_USE_MOCKS true?
                     ├─── Yes ───► [ Local Mock Arrays / Delay Simulation ]
                     └─── No  ───► [ Axios client ] ──► [ NestJS REST API ]
```

All React UI views remain completely unaware of the data origin. They consume standardized TanStack Query hooks, which fetch from abstractions that route requests either to static high-fidelity mocks or to the live HTTP NestJS backend.

---

## 📡 Real-Time Cross-Portal Sync (BroadcastChannel API)

ClinSync features instant, low-latency inter-tab notifications via the native browser **BroadcastChannel API** (channel name: `'clinsync_notifications'`). 

### Real-Time Notification Mechanics:
1. **Patient books an appointment:** The booking tab broadcasts a `{ title: 'Nueva Cita Agendada', role: 'ADMIN' }` message.
2. **Admin/Receptionist dashboard gets notified:** Any open admin tab listening to the channel captures the message, dynamically updates its notification bell counter, saves the alert to `localStorage`, and triggers a **gorgeous slide-out popup toast** using `sonner`.
3. **Admin updates an appointment (Approval / Rescheduling / Cancellation):** The admin's browser window broadcasts a matching message targeting the `'PATIENT'` role.
4. **Patient portal receives details:** The patient's open tab instantly updates its bell count and displays a customized toast (e.g., green for confirmation, blue for rescheduling, and red for cancellations) without requiring any manual refreshing.

---

## 📖 Documented Portals & User Flows

### 👤 Patient Self-Scheduling Portal
- [x] **Account Provisioning:** Self-register with DNI, phone number, and password credentials.
- [x] **Secure Access:** Logging in redirects to `/dashboard`, saving JWT credentials.
- [x] **Specialty Navigator:** Browse clinical areas populated dynamically from PostgreSQL.
- [x] **Available Calendars:** Instantly view active slots, automatically excluding booked slots.
- [x] **Atomic Reservations:** Complete booking reservations, immediately updating booking lists.

### 🏢 Clinic Administrative Dashboard
- [x] **Receptionist Authorization:** Login handles administrative claims and redirects to `/admin`.
- [x] **Operational Control Cards:** Track active counts of today's appointments, pending validations, and attendance indicators.
- [x] **Appointment Lifecycle Manager:**
  - **Validate Cita:** Instantly shifts bookings to confirmed states.
  - **Reprogramar Cita:** Releases the previous time slot back to the directory and locks the newly chosen franja.
  - **Cancelar Cita:** Prompts for a justification reason, cancels booking, and makes the time slot available again.
  - **Asistencia Indicator:** Mark patients as `ATTENDED` or `NO_SHOW`.

---

## ⚙️ Getting Started & Setup

### Environment Variables
Configure the React client behavior by creating a `.env.local` file in the root directory:
```env
# URL pointing to the live NestJS backend API
VITE_API_URL=http://localhost:3000/api

# Turn on/off high-fidelity mock fallback
VITE_USE_MOCKS=false
```

### Installation & Execution
```bash
# Clone the repository and install dependencies
cd clinsync-frontend
npm install

# Start local Vite development server (port 5173 / 5174)
npm run dev

# Compile TypeScript and generate optimized production bundle
npm run build
```

---

## 📈 Build & Performance Metrics

ClinSync Frontend compiles under strict TypeScript compiler rules. Production bundles are highly optimized and code-splitting ready:

* **TypeScript Compilation:** Passed with zero compiler errors.
* **Production Build Output:**
  ```bash
  > tsc -b && vite build
  vite v8.0.12 building client environment for production...
  ✓ 1886 modules transformed.
  
  dist/index.html                   0.47 kB │ gzip:   0.30 kB
  dist/assets/index-_z-11Ihq.css   52.73 kB │ gzip:   9.84 kB
  dist/assets/index-MNhGxyP0.js   639.69 kB │ gzip: 171.25 kB
  
  ✓ built in 1.10s (SUCCESS)
  ```

---

## 🔒 Session Persistence & Route Guards

Security boundaries are enforced client-side using robust React Router components:
* **Stateless Token Persistence:** JWT access tokens and user roles are saved under `clinsync_access_token` and `clinsync_auth_user` storage keys. On app initialization, the `AuthProvider` restores active sessions.
* **`GuestGuard`:** Restricts authenticated users from reaching landing `/` or `/register` paths, routing them instead to their respective dashboards.
* **`AuthGuard`:** Blocks unauthenticated navigation, redirecting visitors back to login.
* **`RoleGuard`:** Enforces granular checks. Standard patient tokens are rejected at the administrative `/admin` gate (returning a 403 authorization boundary), while administrator roles are strictly channeled to Reception.
