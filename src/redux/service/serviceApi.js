import apiSlice from "../api/apiSlice";

const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/services/create-service`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllService: builder.query({
      query: () => `/services`,
      providesTags: ["carCare"],
    }),
    getSingleService: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: ["carCare"],
    }),
    deleteService: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/services/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    updateService: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/services/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useAddResultMutation,
} = serviceApi;
