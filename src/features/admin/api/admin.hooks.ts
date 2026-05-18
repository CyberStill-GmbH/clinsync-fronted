import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "./admin.service";

export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: getAdminDashboard,
  });
}
