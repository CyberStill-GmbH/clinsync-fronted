import { useMutation } from "@tanstack/react-query";
import { login, registerPatient, logout } from "../api/auth.service";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest, RegisterPatientRequest } from "../types/auth.types";

export function useLogin() {
  const { login: authenticate } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (session) => {
      authenticate(session);
    },
  });
}

export function useRegisterPatient() {
  const { login: authenticate } = useAuth();

  return useMutation({
    mutationFn: (payload: RegisterPatientRequest) => registerPatient(payload),
    onSuccess: (session) => {
      authenticate(session);
    },
  });
}

export function useLogout() {
  const { logout: clearSession } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
    },
  });
}
