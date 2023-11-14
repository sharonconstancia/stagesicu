import { apiSlice } from '../apiSlice';
const BLOC_URL = '/api/bloc';
export const blocSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    getbloc: builder.query({
      query: () => ({
        url: BLOC_URL,
      }),
      providesTags: ['bloc'],
      keepUnusedDataFor: 5,
    }),
  
    deletebloc: builder.mutation({
      query: (id) => ({
        url: BLOC_URL + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOnebloc: builder.query({
      query: (id) => ({
        url: BLOC_URL + '/' + id,
      }),
    }),
    updatebloc: builder.mutation({
      query: (data) => ({
        url: BLOC_URL + '/' + data.id,
        method: 'PUT',
        body: data,
      }),
    }),
    bloc: builder.mutation({
      query: (data) => ({
        url: BLOC_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteblocMutation,
  useGetOneblocQuery,
  useGetblocQuery,

  useUpdateblocMutation,
  useBlocMutation,
} = blocSlice;
