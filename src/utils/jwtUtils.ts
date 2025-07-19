import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  authorities: { authority: string }[];
  userId: number;
  role: string;
  exp: number;
  iat: number;
}

export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }

    return decoded;
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
};
