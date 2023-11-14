import { apiSlice } from '../apiSlice';
const INSCRIPTION_URL = '/api/inscription';
export const inscriptionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    getinscription: builder.query({
      query: () => ({
        url: INSCRIPTION_URL,
      }),
      providesTags: ['inscription'],
      keepUnusedDataFor: 5,
    }),
  
    deleteinscription: builder.mutation({
      query: (id) => ({
        url: INSCRIPTION_URL + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneinscription: builder.query({
      query: (id) => ({
        url: INSCRIPTION_URL + '/' + id,
      }),
    }),
    updateinscription: builder.mutation({
      query: (data) => ({
        url: INSCRIPTION_URL + '/' + data.id,
        method: 'PUT',
        body: data,
      }),
    }),
    
    acceptation: builder.mutation({
      query: (data) => ({
        url: `api/inscription/acception/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    inscription: builder.mutation({
      query: (data) => ({
        url: INSCRIPTION_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteinscriptionMutation,
  useGetOneinscriptionQuery,
  useGetinscriptionQuery,
useAcceptationMutation,
  useUpdateinscriptionMutation,
  useInscriptionMutation,
} = inscriptionSlice;
