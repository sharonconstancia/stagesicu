import { apiSlice } from '../apiSlice';
const ETUDIANT_URL = '/api/etudiant';
export const etudiantSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    getetudiant: builder.query({
      query: () => ({
        url: ETUDIANT_URL,
      }),
      providesTags: ['etudiant'],
      keepUnusedDataFor: 5,
    }),
  
    deleteetudiant: builder.mutation({
      query: (id) => ({
        url: ETUDIANT_URL + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneetudiant: builder.query({
      query: (id) => ({
        url: ETUDIANT_URL + '/' + id,
      }),
    }),
    updateetudiant: builder.mutation({
      query: (data) => ({
        url: ETUDIANT_URL + '/' + data.id,
        method: 'PUT',
        body: data,
      }),
    }),
    etudiant: builder.mutation({
      query: (data) => ({
        url: ETUDIANT_URL,
        method: 'POST',
        body: data,
      }),
    }),
    checkcode: builder.mutation({
      query: (data) => ({
        url: '/api/etudiant/verify',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteetudiantMutation,
  useGetOneetudiantQuery,
  useGetetudiantQuery,
  useUpdateetudiantMutation,
  useEtudiantMutation,
  useCheckcodeMutation
} = etudiantSlice;
