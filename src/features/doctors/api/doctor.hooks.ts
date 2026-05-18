import { useQuery, useMutation } from "@tanstack/react-query";
import { getAdminDoctors, createDoctor } from "./doctor.service";
import type { Doctor } from "../types/doctor.types";

export const doctorKeys = {
  all: ["doctors"] as const,
  adminLists: () => [...doctorKeys.all, "adminList"] as const,
};

export function useAdminDoctors() {
  return useQuery({
    queryKey: doctorKeys.adminLists(),
    queryFn: getAdminDoctors,
  });
}

export function useCreateDoctor() {
  return useMutation({
    mutationFn: (payload: Partial<Doctor>) => createDoctor(payload),
  });
}
