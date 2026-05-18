import React, { createContext, useState, useEffect } from "react";
import type { AuthUser, AuthSession } from "../types/auth.types";
import {
  getStoredUser,
  setStoredToken,
  setStoredUser,
  removeStoredToken,
  removeStoredUser,
} from "@/services/storage/token-storage";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (session: AuthSession) => {
    setStoredToken(session.token);
    setStoredUser(session.user);
    setUser(session.user);
  };

  const logout = () => {
    removeStoredToken();
    removeStoredUser();
    setUser(null);
  };

  const updateUser = (updatedUser: AuthUser) => {
    setStoredUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
