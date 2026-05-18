import type { UserRole } from "../types/auth.types";

export const getRedirectPathByRole = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
    case "RECEPTIONIST":
      return "/admin";
    case "PATIENT":
    default:
      return "/dashboard";
  }
};
