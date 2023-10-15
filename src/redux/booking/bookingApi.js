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
      query: ({ page, limit, sortOrder }) => `/bookings`,
      providesTags: ["carCare"],
    }),
    getMyBookings: builder.query({
      query: (headers) => ({
        url: `/bookings/my-bookings`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getSingleBooking: builder.query({
      query: (id) => `/bookings/${id}`,
      providesTags: ["carCare"],
    }),
    deleteBooking: builder.mutation({
      query: ({ id }) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
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
  useGetMyBookingsQuery,
  useGetSingleBookingQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = bookingApi;
