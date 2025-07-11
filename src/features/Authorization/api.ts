import { dummyJsonAxiosInstance } from '@/shared/api';
import { type AuthUser } from './types';

enum AuthApi {
  LOGIN = '/auth/login',
  ME = '/auth/me',
  REFRESH = '/auth/refresh'
}

export const dummyJsonAuthApi = {
  login: async (username: string, password: string) => {
    const response = await dummyJsonAxiosInstance.post<AuthUser>(
      AuthApi.LOGIN,
      {
        username,
        password
      }
    );
    sessionStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response;
  },
  getMe: async (accessToken: string, signal: AbortSignal) => {
    const response = await dummyJsonAxiosInstance.get<AuthUser>(AuthApi.ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      signal
    });
    return response;
  },
  refreshToken: async (refreshToken: string) => {
    const response = await dummyJsonAxiosInstance.post<AuthUser>(
      AuthApi.REFRESH,
      {
        refreshToken
      }
    );
    if (response.status === 200) {
      sessionStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    } else {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return response;
  }
};

dummyJsonAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.name === 'CanceledError') {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== AuthApi.REFRESH
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const response = await dummyJsonAuthApi.refreshToken(refreshToken);
        if (response.status === 200) {
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return dummyJsonAxiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
