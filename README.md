# ClinSync Frontend 💻

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Sonner](https://img.shields.io/badge/Sonner_Toasts-FF6B35?style=for-the-badge)](https://github.com/emilkowalski/sonner)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)

The patient portal and clinical administration dashboard for **ClinSync**. A premium, production-grade React SPA built for real-world clinic usage — not a prototype.

---

## 🏥 Why ClinSync?

ClinSync's frontend is built with a Staff Engineer mindset: every UI decision has a reason, every network call is abstracted, and every error has a user-facing resolution path.

- **Real-time cross-tab notifications** via BroadcastChannel — patient books, admin is notified instantly
- **Dual-mode architecture** — works fully offline with high-fidelity mocks (`VITE_USE_MOCKS=true`)
- **401 auto-logout** — expired tokens redirect to login without any user confusion
- **No `alert()`** — all errors surface as styled `sonner` toasts with actionable messages
- **Skeleton loaders** on every async data surface — no layout shifts, no blank screens
- **Confirmation modals** before every destructive action — no accidental cancellations

---

## 🏗️ Architecture

### Data Flow (Mock / Real API)
```
React Page
    │
    ▼
TanStack Query Hook          ← caches, deduplicates, refetches
    │
    ▼
Service Function             ← single branching point: mock OR real
    │
    ├── VITE_USE_MOCKS=true  → Mock Array (instant, typed)
    │
    └── VITE_USE_MOCKS=false → httpClient (Axios)
                                    │
                              Interceptors:
                              - Attach Bearer token
                              - 401 → clearStorage + redirect
                              - 409 → friendly message
                                    │
                                    ▼
                              NestJS REST API
```

### Route Guards
```
/ (public)
├── GuestGuard     → redirect to dashboard if already logged in
│   ├── /login
│   └── /register

└── AuthGuard      → redirect to / if not authenticated
    ├── RoleGuard(PATIENT)
    │   └── /patient/**
    └── RoleGuard(ADMIN, RECEPTIONIST)
        └── /admin/**
```

---

## 📡 Real-Time Notifications (BroadcastChannel)

ClinSync uses the native browser BroadcastChannel API (`'clinsync_notifications'`) for zero-latency cross-tab communication:

```
[Patient Tab] Books appointment
      │
      └─► BroadcastChannel.postMessage({ role: 'ADMIN', title: 'Nueva Cita' })
                │
      [Admin Tab] Receives message
                │
                ├─► Notification bell count increments (+1)
                ├─► Persisted to localStorage
                └─► sonner toast slides in (top-right)

[Admin Tab] Validates / Reschedules / Cancels
      │
      └─► BroadcastChannel.postMessage({ role: 'PATIENT', title: 'Cita Confirmada' })
                │
      [Patient Tab] Receives message → toast + bell update
```

---

## 📖 User Flows

### 👤 Patient Portal
- [x] Register with DNI, phone, name — creates real PostgreSQL record
- [x] Login → JWT stored → redirect to `/patient`
- [x] Browse medical specialties with visual icons and color palettes
- [x] View available schedule slots by area (AVAILABLE only)
- [x] Book appointment — atomic lock, 409 handled with clear toast
- [x] View appointment history with Spanish status labels
- [x] Real-time notification when admin validates/reschedules/cancels

### 🏢 Admin / Receptionist Dashboard
- [x] Login → role-based redirect to `/admin`
- [x] Dashboard cards with live metrics (today, pending, validated, no-show)
- [x] Skeleton loaders while stats fetch
- [x] Manage all appointments: validate, reschedule, cancel with reason
- [x] Mark attendance: ATTENDED / NO_SHOW
- [x] Confirmation modal before every destructive action
- [x] Real-time toast + bell when patient books

---

## ⚙️ Setup

### Environment
```env
# .env.local — real backend
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCKS=false

# .env.example — mock mode (no backend needed)
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCKS=true
```

### Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle
```

### Test Credentials
| Role | Email | Password |
|---|---|---|
| Admin | `admin@clinsync.com` | `12345678` |
| Receptionist | `recepcion@clinsync.com` | `12345678` |
| Patient | `paciente@test.com` | `12345678` |

---

## 📦 Components

| Component | Purpose |
|---|---|
| `SkeletonCard` | Animated placeholder for list/detail loading |
| `SkeletonStatCard` | Dashboard stat card skeleton |
| `PageLoader` | Full-page spinner for route guard loading state |
| `ConfirmModal` | Accessible destructive-action confirmation dialog (ESC, focus trap) |
| `NotificationsPopover` | Bell icon with BroadcastChannel listener and persistent history |

---

## ✅ Build Metrics

```
tsc -b          ✅ 0 TypeScript errors
vite build      ✅ 1887 modules transformed

dist/index.html                   0.47 kB │ gzip:   0.30 kB
dist/assets/index.css            54.69 kB │ gzip:  10.20 kB
dist/assets/index.js            641.54 kB │ gzip: 171.68 kB

✓ built in 1.82s
```

---

## 🗺️ Roadmap

| Version | Feature |
|---|---|
| **v1.1** | Patient profile editing with appointment history view |
| **v1.2** | Dark mode toggle |
| **v1.3** | Mobile-first responsive improvements |
| **v2.0** | Replace BroadcastChannel with WebSocket for server-push events |
| **v2.1** | Calendar view for admin (visual slot grid) |
