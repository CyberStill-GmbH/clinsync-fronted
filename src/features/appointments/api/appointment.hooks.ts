import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyAppointments,
  getAdminAppointments,
  createAppointment,
  validateAppointment,
  rescheduleAppointment,
  cancelAppointment,
  updateAppointmentAttendance,
} from "./appointment.service";

export const appointmentKeys = {
  all: ["appointments"] as const,
  myAppointments: () => [...appointmentKeys.all, "my"] as const,
  adminAppointments: () => [...appointmentKeys.all, "admin"] as const,
};

export function useMyAppointments() {
  return useQuery({
    queryKey: appointmentKeys.myAppointments(),
    queryFn: getMyAppointments,
  });
}

export function useAdminAppointments() {
  return useQuery({
    queryKey: appointmentKeys.adminAppointments(),
    queryFn: getAdminAppointments,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createAppointment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}

export function useValidateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) => validateAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, payload }: { appointmentId: string; payload: any }) =>
      rescheduleAppointment(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, payload }: { appointmentId: string; payload: any }) =>
      cancelAppointment(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}

export function useUpdateAppointmentAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, payload }: { appointmentId: string; payload: any }) =>
      updateAppointmentAttendance(appointmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}
