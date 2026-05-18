import React, { createContext, useState, useEffect } from "react";
import type { AuthUser, AuthSession } from "../types/auth.types";
import {
  getStoredUser,
  setStoredToken,
  setStoredUser,
  removeStoredToken,
  removeStoredUser,
} from "@/services/storage/token-storage";

import { PageLoader } from "../../../components/ui/SkeletonCard";

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
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }

    // Delay unmounting to let the ECG marker-drawing animation complete gracefully
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const fadeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 700); // Wait for the transition to finish fully
      return () => clearTimeout(fadeTimer);
    }, 2500);

    return () => clearTimeout(timer);
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
      {isLoading && <PageLoader isFadingOut={isFadingOut} />}
    </AuthContext.Provider>
  );
}
