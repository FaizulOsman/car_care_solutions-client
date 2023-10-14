import apiSlice from "../api/apiSlice";

const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/bookings/create-booking`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllBooking: builder.query({
      query: ({ page, limit, sortOrder }) =>
        `/bookings?page=${page}&limit=${limit}&sortOrder=${sortOrder}`,
      providesTags: ["carCare"],
    }),
    getSingleBooking: builder.query({
      query: (id) => `/bookings/${id}`,
      providesTags: ["carCare"],
    }),
    deleteBooking: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingQuery,
  useGetSingleBookingQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = bookingApi;
