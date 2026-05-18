import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminSchedules, getPatientSchedules, getSchedulesByArea, createSchedule } from "./schedule.service";

export const scheduleKeys = {
  all: ["schedules"] as const,
  adminLists: () => [...scheduleKeys.all, "adminList"] as const,
  patientLists: () => [...scheduleKeys.all, "patientList"] as const,
  byArea: (areaId: string) => [...scheduleKeys.all, "byArea", areaId] as const,
};

export function useAdminSchedules() {
  return useQuery({
    queryKey: scheduleKeys.adminLists(),
    queryFn: getAdminSchedules,
  });
}

export function usePatientSchedules() {
  return useQuery({
    queryKey: scheduleKeys.patientLists(),
    queryFn: getPatientSchedules,
  });
}

export function useSchedulesByArea(areaId: string) {
  return useQuery({
    queryKey: scheduleKeys.byArea(areaId),
    queryFn: () => getSchedulesByArea(areaId),
    enabled: !!areaId,
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createSchedule(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
  });
}
