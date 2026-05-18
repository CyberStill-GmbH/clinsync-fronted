import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";

export interface AdminDashboardStats {
  todayAppointments: number;
  pendingAppointments: number;
  validatedAppointments: number;
  noShowAppointments: number;
  availableSchedules: number;
}

const mockStats: AdminDashboardStats = {
  todayAppointments: 24,
  pendingAppointments: 6,
  validatedAppointments: 15,
  noShowAppointments: 3,
  availableSchedules: 42,
};

export async function getAdminDashboard(): Promise<AdminDashboardStats> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockStats), 500));
  }
  const { data } = await httpClient.get<AdminDashboardStats>(endpoints.admin.dashboard);
  return data;
}
