import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  clearSession,
  readToken,
  readUser,
  saveSession,
  SESSION_EXPIRED_EVENT,
  type AuthUser,
} from "../services/authStorage";

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  roles: string[];
  permissions: string[];
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const getPermissions = (roles: string[]) =>
  roles.includes("admin") ? ["dashboard:view", "admin:view"] : ["dashboard:view"];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => readUser());
  const [token, setToken] = useState<string | null>(() => readToken());

  useEffect(() => {
    const handleSessionExpired = () => {
      clearSession();
      setUser(null);
      setToken(null);
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, []);

  const login = async ({ username, password }: LoginPayload) => {
    const normalizedName = username.trim();

    if (!normalizedName || !password) {
      throw new Error("请输入用户名和密码");
    }

    await new Promise((resolve) => window.setTimeout(resolve, 300));

    const roles = normalizedName === "admin" ? ["admin", "user"] : ["user"];
    const nextUser: AuthUser = {
      id: normalizedName,
      name: normalizedName,
      roles,
      permissions: getPermissions(roles),
    };
    const nextToken = window.btoa(`${normalizedName}:${Date.now()}`);

    saveSession(nextToken, nextUser);
    setUser(nextUser);
    setToken(nextToken);
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setToken(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      roles: user?.roles ?? [],
      permissions: user?.permissions ?? [],
      isAuthenticated: Boolean(user && token),
      login,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
