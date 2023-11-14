import { apiSlice } from '../apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    createAccount: builder.mutation({
      query: (data) => ({
        url: '/api/compte',
        method: 'POST',
        body: data,
      }),
    }),
    countEnqueteur: builder.query({
      query: () => ({
        url: '/api/enqueteur/count',
      }),
    }),
  }),
});

export const {  useCreateAccountMutation, useCountEnqueteurQuery } = userSlice;
