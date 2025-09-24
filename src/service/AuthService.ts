import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/login`, payload);
    AuthService.setTokens(data.accessToken, data.refreshToken);
    return data;
  }

  static async refreshToken(): Promise<AuthResponse> {
    const refreshToken = AuthService.getRefreshToken();
    const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, { refreshToken });
    AuthService.setTokens(data.accessToken, data.refreshToken);
    return data;
  }

  static logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  static setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  static getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  static hasValidToken() {
    const token = AuthService.getAccessToken();
    if (!token) return false;
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
} 