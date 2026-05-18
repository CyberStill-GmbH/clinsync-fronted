export type UserRole = "PATIENT" | "ADMIN" | "RECEPTIONIST";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterPatientRequest {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  district?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}
