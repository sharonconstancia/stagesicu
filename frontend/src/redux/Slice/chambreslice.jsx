import { apiSlice } from '../apiSlice';
const CHAMBRE_URL = '/api/chambre';
export const chambreSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    getchambre: builder.query({
      query: () => ({
        url: CHAMBRE_URL,
      }),
      providesTags: ['chambre'],
      keepUnusedDataFor: 5,
    }),
  
    deletechambre: builder.mutation({
      query: (id) => ({
        url: CHAMBRE_URL + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOnechambre: builder.query({
      query: (id) => ({
        url: CHAMBRE_URL + '/' + id,
      }),
    }),
    updatechambre: builder.mutation({
      query: (data) => ({
        url: CHAMBRE_URL + '/' + data.id,
        method: 'PUT',
        body: data,
      }),
    }),
    chambre: builder.mutation({
      query: (data) => ({
        url: CHAMBRE_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeletechambreMutation,
  useGetOnechambreQuery,
  useGetchambreQuery,

  useUpdatechambreMutation,
  useChambreMutation,
} = chambreSlice;
