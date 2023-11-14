import { apiSlice } from '../apiSlice';

const URL_BENEFICIAIRE = '/api/beneficiaire'

export const beneficiaireSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBeneficiaire: builder.mutation({
      query: (data) => ({
        url: URL_BENEFICIAIRE,
        method: 'POST',
        body: data,
      }),
    }),

    getBeneficiaire: builder.query({
      query: () => ({
        url: URL_BENEFICIAIRE,
      }),
      providesTags: ['Beneficiaire'],
      keepUnusedDataFor: 5,
    }),
    countBeneficiaire: builder.query({
      query: () => ({
        url: '/api/beneficiaire/count',
      }),
      providesTags: ['Beneficiaire'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateBeneficiaireMutation,
  useGetBeneficiaireQuery,
  useCountBeneficiaireQuery,
} = beneficiaireSlice;
