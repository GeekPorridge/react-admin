export interface AuthUser {
  id: string;
  name: string;
  roles: string[];
  permissions: string[];
}

const TOKEN_KEY = "react_admin_token";
const USER_KEY = "react_admin_user";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isAuthUser = (value: unknown): value is AuthUser => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isStringArray(value.roles) &&
    isStringArray(value.permissions)
  );
};

export const readToken = () => localStorage.getItem(TOKEN_KEY);

export const readUser = (): AuthUser | null => {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser: unknown = JSON.parse(rawUser);
    return isAuthUser(parsedUser) ? parsedUser : null;
  } catch {
    return null;
  }
};

export const saveSession = (token: string, user: AuthUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
