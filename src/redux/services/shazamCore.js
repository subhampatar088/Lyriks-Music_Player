/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '3df58d0ad7mshf9e6861b6d5ab77p1f428bjsnbc132f3ab745'
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/shazam-songs/get-details?id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) =>
        `/shazam-songs/list-similarities?id=track-similarities-id-${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/get-summary?id=${artistId}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?term=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;

export const shazamCoreApiV2 = createApi({
  reducerPath: 'shazamCoreApiV2',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-api7.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '3df58d0ad7mshf9e6861b6d5ab77p1f428bjsnbc132f3ab745'
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByGenre: builder.query({
      query: (genre) =>
        `/charts/get-top-songs-in_country_by_genre?country_code=US&genre=${genre}&limit=50`,
    }),
  }),
});

export const { useGetSongsByGenreQuery } = shazamCoreApiV2;
