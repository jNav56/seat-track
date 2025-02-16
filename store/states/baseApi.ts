import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { createAction } from '@reduxjs/toolkit';

type QueryArgs = {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
};

type QueryError = {
    status: number;
    data: unknown;
}

type QueryFn = BaseQueryFn<QueryArgs, unknown, QueryError>;

const baseAxios = axios.create({
    baseURL: '',
});

let requestInterceptor = baseAxios.interceptors.request.use((config) => config);

const unauthorized = createAction<QueryError>('baseApi/UNAUTHORIZED');

const baseQuery: QueryFn = async (args, api) => {
  try {
    const result = await baseAxios.request({
      url: args.url,
      method: args.method,
      data: args.data,
      params: args.params,
    });

    return { data: result.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;
    const status = error.response?.status ?? -1;
    const data = error.response?.data || error.message;

    if (status === 401) {
      api.dispatch(unauthorized({ status, data }));
    }

    return { error: { status, data } };
  }
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export const resetConfig = () => {
  baseAxios.interceptors.request.eject(requestInterceptor);
};

export const setConfigRequest = (token: string) => {
  resetConfig();

  requestInterceptor = baseAxios.interceptors.request.use((config) => {
    config.headers = { ...config.headers, Token: token } as any;
    config.params = { ...config.params, Token: token };
    config.withCredentials = true;

    return config;
  });
};
