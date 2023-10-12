import apiSlice from "../api/apiSlice";

const addToCartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddToCart: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/addToCart/create-addToCart`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllAddToCart: builder.query({
      query: ({ headers }) => ({
        url: `/addToCart/ `,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getSingleAddToCart: builder.query({
      query: ({ questionId, headers }) => ({
        url: `/addToCart/${questionId}`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    deleteAddToCart: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/addToCart/delete-addToCart`,
        method: "DELETE",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    updateAddToCart: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/addToCart/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useCreateAddToCartMutation,
  useGetAllAddToCartQuery,
  useGetSingleAddToCartQuery,
  useDeleteAddToCartMutation,
  useUpdateAddToCartMutation,
} = addToCartApi;
