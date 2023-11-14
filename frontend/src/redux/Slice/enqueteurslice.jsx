import { apiSlice } from '../apiSlice';
const URL_ENQUETEUR = '/api/enqueteur';

export const enqueteurSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEnqueteur: builder.mutation({
      query: (data) => ({
        url: URL_ENQUETEUR,
        method: 'POST',
        body: data,
      }),
    }),
    updateEnqueteur: builder.mutation({
      query: (data) => ({
        url: URL_ENQUETEUR + '/' + data.id,
        method: 'PUT',
        body: data,
      }),
    }),

    getEnqueteur: builder.query({
      query: () => ({
        url: URL_ENQUETEUR,
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 5,
    }),
    uploadUserImage: builder.mutation({
      query: (data) => ({
        url: '/api/upload',
        method: 'POST',
        body: data,
      }),
    }),
    deleteEnqueteur: builder.mutation({
      query: (id) => ({
        url: URL_ENQUETEUR + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneEnqueteur: builder.query({
      query: (id) => ({
        url: URL_ENQUETEUR + '/' + id,
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateEnqueteurMutation,
  useUpdateEnqueteurMutation,
  useGetEnqueteurQuery,
  useUploadUserImageMutation,
  useDeleteEnqueteurMutation,
  useGetOneEnqueteurQuery,
} = enqueteurSlice;
