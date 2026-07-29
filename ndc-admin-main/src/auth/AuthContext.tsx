import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { login as loginRequest } from "../services/data.service";

type AdminUser = { 
  id: string; 
  name: string; 
  email: string; 
  role: string;
  dob?: string;
  address?: string;
  profileImage?: string;
  createdAt?: string;
};

type AuthContextValue = {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: AdminUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const raw = localStorage.getItem("ndc_admin_user");
    return raw ? JSON.parse(raw) : null;
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      async login(email, password) {
        const res = await loginRequest(email, password);
        const { token, user: loggedInUser } = res.data;
        localStorage.setItem("ndc_admin_token", token);
        localStorage.setItem("ndc_admin_user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
      },
      logout() {
        localStorage.removeItem("ndc_admin_token");
        localStorage.removeItem("ndc_admin_user");
        setUser(null);
      },
      updateUser(updatedUser: AdminUser) {
        localStorage.setItem("ndc_admin_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
