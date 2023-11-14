import { apiSlice } from '../apiSlice';

const URL_PERSONNE = '/api/personne';

export const personneSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPersonne: builder.mutation({
      query: (data) => ({
        url: URL_PERSONNE,
        method: 'POST',
        body: data,
      }),
    }),

    getPersonne: builder.query({
      query: () => ({
        url: URL_PERSONNE,
      }),
      providesTags: ['Personne'],
      keepUnusedDataFor: 5,
    }),
 
  }),
});

export const {
useCreatePersonneMutation,
useGetPersonneQuery,

} = personneSlice;
