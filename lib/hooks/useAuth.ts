"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { get, post } from "@/lib/api/client";
import type { UserPublic } from "@/lib/repositories/interfaces";

interface AuthContextValue {
  user: UserPublic | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (data: { email: string; password: string; first_name: string; last_name: string }) => Promise<string | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = AuthContext.Provider;

export function useAuthValue(): AuthContextValue {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await get<UserPublic>("/api/auth/me");
    setUser(res.ok ? res.data : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await post<UserPublic>("/api/auth/login", { email, password });
    if (!res.ok) return res.error;
    setUser(res.data);
    return null;
  }, []);

  const register = useCallback(async (data: { email: string; password: string; first_name: string; last_name: string }) => {
    const res = await post<UserPublic>("/api/auth/register", data);
    if (!res.ok) return res.error;
    setUser(res.data);
    return null;
  }, []);

  const logout = useCallback(async () => {
    await post("/api/auth/logout", {});
    setUser(null);
  }, []);

  return { user, loading, login, register, logout, refresh };
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
