import { createHashRouter } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import MedicalAreas from "./pages/MedicalAreas";
import Schedules from "./pages/Schedules";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMedicalAreas from "./pages/admin/AdminAreas";
import AdminSchedules from "./pages/admin/AdminSchedules";
import AdminAppointments from "./pages/admin/AdminAppointment";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminSettings from "./pages/admin/AdminSettings";

import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";
import { RoleGuard } from "./guards/RoleGuard";

export const router = createHashRouter([
  {
    path: "/",
    Component: GuestGuard,
    children: [
      { index: true, Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    Component: AuthGuard,
    children: [
      {
        path: "",
        element: <RoleGuard allowedRoles={["PATIENT"]} fallbackPath="/login" />,
        children: [
          {
            path: "",
            Component: DashboardLayout,
            children: [
              { index: true, Component: DashboardHome },
              { path: "areas", Component: MedicalAreas },
              { path: "schedules", Component: Schedules },
              { path: "book", Component: BookAppointment },
              { path: "appointments", Component: MyAppointments },
              { path: "invoices", Component: Invoices },
              { path: "payments", Component: Payments },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    Component: AuthGuard,
    children: [
      {
        path: "",
        element: <RoleGuard allowedRoles={["ADMIN", "RECEPTIONIST"]} fallbackPath="/login" />,
        children: [
          {
            path: "",
            Component: AdminLayout,
            children: [
              { index: true, Component: AdminDashboard },
              { path: "areas", Component: AdminMedicalAreas },
              { path: "schedules", Component: AdminSchedules },
              { path: "appointments", Component: AdminAppointments },
              { path: "patients", Component: AdminPatients },
              { path: "doctors", Component: AdminDoctors },
              { path: "settings", Component: AdminSettings },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);