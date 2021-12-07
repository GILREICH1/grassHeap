import { SERVER_URL as base_url } from '../utils/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Plant } from '../common/types';

export const plantsApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: builder => ({
    getPlants: builder.query<Plant[], void>({
      query: () => '/plants',
    }),
  }),
});

export const { useGetPlantsQuery } = plantsApi;
