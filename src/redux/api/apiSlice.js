import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://car-care-solutions-server.vercel.app/api/v1",
  }),
  tagTypes: ["carCare"],
  endpoints: () => ({}),
});

export default apiSlice;
