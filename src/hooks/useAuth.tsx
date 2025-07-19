import { useMemo } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  sub: string;
  authorities: { authority: string }[];
  userId: number;
  role: string;
  exp: number;
  iat: number;
}

export const useAuth = (): DecodedToken | null => {
  return useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  }, []);
};
