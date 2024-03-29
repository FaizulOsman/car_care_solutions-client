import apiSlice from "../api/apiSlice";

const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/feedbacks/create-feedback`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllFeedback: builder.query({
      query: ({ limit, page, sortOrder, headers }) => ({
        url: `/feedbacks?${limit > 0 && `limit=${limit}`}&${
          page && `page=${page}`
        }&${sortOrder && `sortOrder=${sortOrder}`}`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getSingleFeedback: builder.query({
      query: (id) => `/feedbacks/${id}`,
      providesTags: ["carCare"],
    }),
    deleteFeedback: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/feedbacks/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    updateFeedback: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/feedbacks/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/feedbacks/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetSingleFeedbackQuery,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
  useAddResultMutation,
} = feedbackApi;
