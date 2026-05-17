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

export const router = createHashRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
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
  {
    path: "*",
    Component: NotFound,
  },
]);