import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { localStorageKeys } from '../components/common/constants';
import { apiRoutes } from './api.routes';
import { IJWTs } from './api.interface';

const axiosConfig = {
  // todo set right headers
  withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "http://localhost:5000",
  //   "Content-Type": "application/json",
  // },
  // baseURL: process.env.REACT_APP_RB_API_URL,
};

export const $api = axios.create(axiosConfig);

$api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`;
  }
  return config;
});

declare module 'axios' {
  export interface AxiosRequestConfig {
    _isRetry?: boolean;
  }
}

$api.interceptors.response.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  },
  async (error: AxiosError) => {
    // todo 401 status can be in different situation !?
    if (error.response?.status === 401) {
      const response = await axios.get<Pick<IJWTs, 'access_token'>>(
        apiRoutes.refreshTokens,
        axiosConfig
      );

      if (response.status === 200) {
        localStorage.setItem(localStorageKeys.accessToken, response.data.access_token);
        return $api.request(error.config);
      }
      // todo redo to try catch (https://www.youtube.com/watch?v=fN25fMQZ2v0&t=6170s)
    }
    throw error;
  }
);
