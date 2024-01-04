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
    getMyReviews: builder.query({
      query: (headers) => ({
        url: `/reviews/my-reviews`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getAllReview: builder.query({
      query: (headers) => ({
        url: `/reviews`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getSingleReview: builder.query({
      query: ({ id, headers }) => ({
        url: `/reviews/${id}`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useGetAllReviewQuery,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
} = reviewApi;
