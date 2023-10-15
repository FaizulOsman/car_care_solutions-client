import apiSlice from "../api/apiSlice";

const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFaq: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/faq/create-faq`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllFaq: builder.query({
      query: () => `/faq`,
      providesTags: ["carCare"],
    }),
    getSingleFaq: builder.query({
      query: (id) => `/faq/${id}`,
      providesTags: ["carCare"],
    }),
    deleteFaq: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/faq/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetAllFaqQuery,
  useGetSingleFaqQuery,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = faqApi;
