import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";
import type { LoginRequest, RegisterPatientRequest, AuthSession } from "../types/auth.types";

const mockAuthSession: AuthSession = {
  token: "mock-jwt-token-12345",
  user: {
    id: "user-1",
    name: "César Guevara",
    email: "cesar@example.com",
    role: "PATIENT",
  },
};

export async function login(payload: LoginRequest): Promise<AuthSession> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockAuthSession), 500));
  }
  const { data } = await httpClient.post(endpoints.auth.login, payload);
  return data;
}

export async function registerPatient(payload: RegisterPatientRequest): Promise<AuthSession> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockAuthSession), 500));
  }
  const { data } = await httpClient.post(endpoints.auth.registerPatient, payload);
  return data;
}

export async function getMe(): Promise<AuthSession["user"]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockAuthSession.user), 500));
  }
  const { data } = await httpClient.get(endpoints.auth.me);
  return data;
}

export async function logout(): Promise<void> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
  }
  await httpClient.post(endpoints.auth.logout);
}
