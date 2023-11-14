import { apiSlice } from '../apiSlice';

const URL_CATEGORIE = '/api/categorie';

export const categorieSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategorie: builder.mutation({
      query: (data) => ({
        url: URL_CATEGORIE,
        method: 'POST',
        body: data,
      }),
    }),

    getCategorie: builder.query({
      query: () => ({
        url: URL_CATEGORIE,
      }),
      providesTags: ['Categorie'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateCategorieMutation, useGetCategorieQuery } =
  categorieSlice;
