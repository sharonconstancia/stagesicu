import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'Enqueteur',
    'Bloc',
    'Chambre',
    'Etudiant',
    'Locateur',
    'Commune',
    'Compte',
    'Personne',
    'Beneficiaire',
    'Question',
    'Reponse',
    'Formulaire',
    
  ],

  endpoints: (builder) => ({}),
});
