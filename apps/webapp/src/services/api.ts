import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getAccessToken } from './tokens';
import { ApiError } from '@fit-friends/shared-types';
import { toast } from 'react-toastify';

const REQUEST_TIMEOUT = 5000;

export function createApi(url: string): AxiosInstance {
  const api = axios.create({
    baseURL: url,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      if (error.response && shouldShowError(error.response)) {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message = error.response.data.message.join('\n');
        }
        toast.error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );

  return api;
}

function shouldShowError(response: AxiosResponse) {
  return {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true,
  }[response.status];
}
