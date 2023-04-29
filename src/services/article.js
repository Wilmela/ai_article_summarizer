import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const articleAPIKey = import.meta.env.VITE_API_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  // baseQuery sets up the API baseUrl we want to call
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    // Contains all the header properties
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", articleAPIKey),
        headers.set(
          "X-RapidAPI-Host",
          "article-extractor-and-summarizer.p.rapidapi.com"
        );

      return headers;
    },
  }),

  //Builder is used to build the endpoint queries
  endpoints: (builder) => ({
    getSummary: builder.query({
      //This is like calling baseUrl/summarize?url=......
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

//useLazyGetSummaryQuery helps us to fire the query on demand as opposed to useLazyGetSummaryQuery which fires automatically as soon as the app loads
export const { useLazyGetSummaryQuery } = articleApi;
