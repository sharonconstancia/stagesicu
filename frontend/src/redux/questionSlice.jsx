import { apiSlice } from './apiSlice';

const questionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFirstQuestion: builder.query({
      query: () => ({
        url: '/api/question/one',
      }),
      keepUnusedDataFor: 5,
    }),
    getQuestionById: builder.query({
      query: (id) => ({
        url: '/api/question/' + id,
      }),
    }),
  }),
});

export const { useGetFirstQuestionQuery, useGetQuestionByIdQuery } =
  questionSlice;
