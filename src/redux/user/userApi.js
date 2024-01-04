import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["carCare"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["carCare"],
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["carCare"],
    }),
    getAllUsers: builder.query({
      query: ({ headers }) => ({
        url: `/users`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getSingleUser: builder.query({
      query: ({ id, headers }) => ({
        url: `/users/${id}`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    getAllUsersByQuery: builder.query({
      query: ({ headers, limit, page, sortOrder }) => ({
        url: `/users?limit=${limit}&page=${page}&sortOrder=${sortOrder}`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    deleteUser: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
    getMyProfile: builder.query({
      query: ({ headers }) => ({
        url: `/users/my-profile`,
        headers: headers,
      }),
      providesTags: ["carCare"],
    }),
    updateMyProfile: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/users/my-profile`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["carCare"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetAllUsersByQueryQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = userApi;
