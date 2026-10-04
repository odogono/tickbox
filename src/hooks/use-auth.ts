import { createContext, useContext } from "react";
import type { User } from "@/lib/types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  isAuthenticated: false,
});

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
