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
        '675ae81d89msh8f9a5ecbdf30cbap1d8485jsnf4d36d55dc6b'
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
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
} = shazamCoreApi;
