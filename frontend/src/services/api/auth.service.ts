import { apiClient, setAuthToken } from './client';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../../types';

export const authService = {
  /**
   * Login user
   * POST /api/auth/login
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    setAuthToken(response.token);
    return response;
  },

  /**
   * Register new user
   * POST /auth/register
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      ...(userData.role ? { role: userData.role } : {}),
    };
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    setAuthToken(response.token);
    return response;
  },

  /**
   * Get current user
   * GET /api/auth/me
   */
  async getCurrentUser(): Promise<User> {
    return await apiClient.get<User>('/auth/me');
  },

  /**
   * Logout user
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.warn('Logout failed, clearing local data');
    } finally {
      setAuthToken(null);
    }
  },

  /**
   * Refresh token
   * POST /api/auth/refresh
   */
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/refresh');
      setAuthToken(response.token);
      return response;
    } catch (error) {
      console.warn('Token refresh failed');
      throw error;
    }
  },

  /**
   * Send password reset OTP
   * POST /auth/send-reset-otp
   */
  async sendResetOtp(email: string): Promise<{ ok: boolean; message: string }> {
    return await apiClient.post<{ ok: boolean; message: string }>('/auth/send-reset-otp', { email });
  },

  /**
   * Verify password reset OTP
   * POST /auth/verify-reset-otp
   */
  async verifyResetOtp(email: string, otp: string): Promise<{ ok: boolean; resetToken: string }> {
    return await apiClient.post<{ ok: boolean; resetToken: string }>('/auth/verify-reset-otp', { email, otp });
  },

  /**
   * Reset password with token
   * POST /auth/reset-password
   */
  async resetPassword(resetToken: string, newPassword: string): Promise<{ ok: boolean; message: string }> {
    return await apiClient.post<{ ok: boolean; message: string }>('/auth/reset-password', { resetToken, newPassword });
  },
};
