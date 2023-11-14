import { apiSlice } from '../apiSlice';
const LOCATEUR_URL = '/api/locateur';
export const locateurSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    getlocateur: builder.query({
      query: () => ({
        url: LOCATEUR_URL,
      }),
      providesTags: ['locateur'],
      keepUnusedDataFor: 5,
    }),
    getlocateurNombre: builder.query({
      query: () => ({
        url: '/api/locateur/get',
      }),
      providesTags: ['locateur'],
      keepUnusedDataFor: 5,
    }),
  
    deletelocateur: builder.mutation({
      query: (id) => ({
        url: LOCATEUR_URL + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOnelocateur: builder.query({
      query: (id) => ({
        url: LOCATEUR_URL + '/' + id,
      }),
    }),



    getLocateurSortie: builder.query({
      query:  (id) => ({
        url: LOCATEUR_URL + '/api/locateur/date' + id,
      }),
    }),



    updatelocateur: builder.mutation({
      query: (data) => ({
        url: LOCATEUR_URL + '/' + data.id,
        method: 'PUT',
        body: data,
      }),
    }),
    locateur: builder.mutation({
      query: (data) => ({
        url: LOCATEUR_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeletelocateurMutation,
  useGetOnelocateurQuery,
  useGetlocateurQuery,
  useGetlocateurNombreQuery,
  useGetLocateurSortieQuery,
  useUpdatelocateurMutation,
  useLocateurMutation
} = locateurSlice;
