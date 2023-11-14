import { apiSlice } from '../apiSlice';

const URL_QUESTION = '/api/question';

export const questionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (data) => ({
        url: URL_QUESTION,
        method: 'POST',
        body: data,
      }),
    }),

    getQuestion: builder.query({
      query: () => ({
        url: URL_QUESTION,
      }),
      providesTags: ['Question'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateQuestionMutation, useGetQuestionQuery } = questionSlice;
