<div align="center">

# ClinSync · Frontend

**Clinical appointment portal for patients and administrative staff.**  
Built with React, Vite, TypeScript, TanStack Query, and Tailwind CSS.

[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)]()
[![React](https://img.shields.io/badge/React-18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=flat-square)](https://tanstack.com/query)
[![Bundle](https://img.shields.io/badge/gzip-171_kB-informational?style=flat-square)]()
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)]()

</div>

---

## Overview

ClinSync Frontend is a production-grade React SPA serving two distinct user contexts: a **patient self-scheduling portal** and a **clinical administration dashboard**. Both portals run under a unified codebase with role-based routing guards, shared server state via TanStack Query, and a service layer that supports both live API integration and high-fidelity mock mode.

Design principles applied throughout:

- Every network call goes through a typed service function — no `fetch` or `axios` in component files
- Every error state has a resolution path — no bare `catch` blocks that swallow failures silently
- Every loading state has a visual representation — no blank screens or layout shifts
- Every destructive action requires explicit confirmation — no accidental data mutations

---

## Architecture

### Data Flow

```
Component / Page
      │
      ▼
TanStack Query Hook          Server state — caches, deduplicates, background-refetches
      │
      ▼
Service Function              Single branching point: mock data OR real API
      │
      ├── VITE_USE_MOCKS=true  ──►  Typed mock array with simulated delay
      │
      └── VITE_USE_MOCKS=false ──►  httpClient (Axios instance)
                                          │
                                    Request Interceptor
                                    - Attach: Authorization: Bearer <token>
                                          │
                                    Response Interceptor
                                    - 401: clearStorage() + redirect to /
                                    - 409: normalize to user-friendly message
                                          │
                                    NestJS REST API  →  PostgreSQL
```

### Route Guard Tree

```
/  (public landing / login)
│
├── GuestGuard          Redirects authenticated users to their dashboard
│   ├── /               Login form
│   └── /register       Patient registration
│
└── AuthGuard           Redirects unauthenticated users to /
    │
    ├── RoleGuard(PATIENT)
    │   └── /patient/**
    │       ├── /patient/dashboard
    │       ├── /patient/book
    │       ├── /patient/appointments
    │       └── /patient/profile
    │
    └── RoleGuard(ADMIN, RECEPTIONIST)
        └── /admin/**
            ├── /admin/dashboard
            ├── /admin/appointments
            ├── /admin/patients
            ├── /admin/doctors
            ├── /admin/areas
            └── /admin/schedules
```

---

## Real-Time Cross-Tab Notifications

Both portals communicate in real time using the browser's native `BroadcastChannel` API (channel: `clinsync_notifications`). This approach requires no WebSocket infrastructure and works reliably across same-origin tabs.

```
[Patient Tab]
Patient completes booking
      │
      └──► channel.postMessage({ title, message, type, role: 'ADMIN' })

                    [Admin Tab — NotificationsPopover listener]
                    channel.onmessage fires
                          │
                          ├── Notification saved to localStorage
                          ├── Bell counter increments
                          └── sonner toast slides in (top-right)

[Admin Tab]
Admin validates / reschedules / cancels appointment
      │
      └──► channel.postMessage({ title, message, type, role: 'PATIENT' })

                    [Patient Tab — NotificationsPopover listener]
                    channel.onmessage fires
                          │
                          ├── Notification saved to localStorage
                          ├── Bell counter increments
                          └── sonner toast slides in (top-right)
```

The `role` field in the message payload ensures notifications are only rendered by the correct portal — admin messages are ignored by patient tabs and vice versa.

---

## Setup

### Environment Variables

```sh
# .env.local — connect to live backend
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCKS=false

# .env.example — run without backend (default for new contributors)
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCKS=true
```

### Installation

```sh
npm install
npm run dev       # http://localhost:5173
```

### Test Accounts (seeded by backend)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@clinsync.com` | `12345678` |
| Receptionist | `recepcion@clinsync.com` | `12345678` |
| Patient | `paciente@test.com` | `12345678` |

---

## Module Structure

```
src/
├── app/              # appConfig, router, queryClient
├── components/
│   └── ui/
│       ├── ConfirmModal.tsx        # Accessible destructive-action dialog
│       ├── NotificationsPopover.tsx # Bell + BroadcastChannel listener
│       ├── SkeletonCard.tsx         # SkeletonCard, SkeletonStatCard, PageLoader
│       └── Logo.tsx
├── features/
│   ├── auth/         # AuthProvider, useAuth, login/register services
│   ├── appointments/ # Hooks, service, mock data, type definitions
│   ├── areas/        # Medical area service with visual metadata mapper
│   ├── doctors/      # Doctor service and hooks
│   ├── patients/     # Patient profile service
│   ├── schedules/    # Schedule service and hooks
│   └── admin/        # Dashboard service and hooks
├── guards/
│   ├── AuthGuard.tsx   # Blocks unauthenticated access
│   ├── GuestGuard.tsx  # Blocks authenticated users from login/register
│   └── RoleGuard.tsx   # Enforces PATIENT vs ADMIN/RECEPTIONIST boundaries
├── layouts/
│   ├── DashboardLayout.tsx  # Patient sidebar and header
│   └── AdminLayout.tsx      # Admin sidebar and header
├── pages/
│   ├── admin/        # AdminDashboard, AdminAppointment, AdminPatients, etc.
│   └── patient/      # BookAppointment, MyAppointments, etc.
└── services/
    ├── api/
    │   ├── http-client.ts   # Axios instance with request/response interceptors
    │   ├── endpoints.ts     # Centralized URL map — no hardcoded strings in pages
    │   └── api-error.ts     # Error normalization
    └── storage/
        └── token-storage.ts # clinsync_access_token + clinsync_auth_user
```

---

## Component Reference

| Component | Purpose |
|---|---|
| `ConfirmModal` | Modal dialog for destructive actions. Supports ESC key, focus trap, danger/warning/primary variants, and a loading state that disables the confirm button |
| `SkeletonCard` | Animated placeholder for list and detail content while data loads |
| `SkeletonStatCard` | Dashboard-specific skeleton that matches the stat card layout |
| `PageLoader` | Full-page centered spinner used by `AuthGuard` during session restoration |
| `NotificationsPopover` | Bell icon with real-time BroadcastChannel listener, persistent localStorage history, and unread badge counter |

---

## Session Management

```
login() called
      │
      ├── setStoredToken(token)     →  localStorage['clinsync_access_token']
      └── setStoredUser(user)       →  localStorage['clinsync_auth_user']

App reloads
      │
      └── AuthProvider useEffect reads storage → restores session without API call

Token expires (backend returns 401)
      │
      └── httpClient response interceptor
            ├── clearAuthStorage()   removes both keys
            └── window.location.href = '/'   forces re-login

logout() called
      │
      ├── removeStoredToken()
      └── removeStoredUser()
```

---

## Build Output

```
tsc -b                  0 TypeScript errors (strict mode)
vite build              1887 modules transformed

dist/index.html         0.47 kB   gzip:   0.30 kB
dist/assets/index.css  54.69 kB   gzip:  10.20 kB
dist/assets/index.js  641.54 kB   gzip: 171.68 kB

Built in 1.82 seconds
```

---

## Patient Appointment Flow

```
1. Select medical area (GET /areas)
2. Select available date/time slot (GET /areas/:id/schedules)
3. Review booking details
4. Confirm (POST /appointments)
      │
      ├── Success: slot → OCCUPIED, appointment created, patient notified, admin broadcast sent
      └── 409: slot already taken → toast.error with clear resolution message
```

---

## Admin Appointment Lifecycle

```
Created by patient (CONFIRMED)
      │
      ├── validate   →  VALIDATED_BY_RECEPTION  (blocked if already terminal)
      ├── reschedule →  RESCHEDULED              (old slot released, new slot locked)
      ├── cancel     →  CANCELLED_BY_RECEPTION   (reason required, slot released)
      └── attendance →  ATTENDED | NO_SHOW
```

Each admin action triggers a BroadcastChannel notification to the patient's active tab.

---

## Roadmap

| Version | Planned |
|---|---|
| v1.1 | Patient profile editing with editable DNI, phone, and emergency contact |
| v1.2 | Paginated patient list with search in admin panel |
| v1.3 | Admin calendar view — visual grid of occupied and available slots by day |
| v2.0 | Replace BroadcastChannel with WebSocket for server-push events |
| v2.1 | Dark mode toggle |
| v2.2 | Progressive Web App (PWA) manifest for mobile installation |
