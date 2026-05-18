import { useQuery } from "@tanstack/react-query";
import { getAdminPatients } from "./patient.service";

export const patientKeys = {
  all: ["patients"] as const,
  adminLists: () => [...patientKeys.all, "adminList"] as const,
};

export function useAdminPatients() {
  return useQuery({
    queryKey: patientKeys.adminLists(),
    queryFn: getAdminPatients,
  });
}
