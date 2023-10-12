import apiSlice from "../api/apiSlice";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/reviews/create-review`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllReview: builder.query({
      query: () => `/reviews`,
      providesTags: ["carCare"],
    }),
    getSingleReview: builder.query({
      query: ({ id, headers }) => ({
        url: `/reviews/${id}`,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useGetSingleReviewQuery,
} = reviewApi;
