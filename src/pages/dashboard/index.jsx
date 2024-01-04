import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Users from "./users";
import AllServices from "./service/all-service";
import MyProfile from "./my-profile";
import { useGetAllUsersQuery } from "../../redux/user/userApi";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import { useGetMyBookingsQuery } from "../../redux/booking/bookingApi";
import { useGetMyReviewsQuery } from "../../redux/review/reviewApi";
import { useGetAllAddToCartQuery } from "../../redux/addToCart/addToCartApi";
import CartPage from "./cart";
import BookingsPage from "./bookings";
import AllReviewsPage from "./reviews";

const jwt = require("jsonwebtoken");

const DashboardPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  const { data: getAllUser } = useGetAllUsersQuery({ headers });
  const { data: getAllServices } = useGetAllServiceQuery({
    searchValue: "",
    status: "",
  });
  const { data: getMyBookings } = useGetMyBookingsQuery(headers);
  const { data: getReviews } = useGetMyReviewsQuery(headers);
  const { data: getAllAddToCart } = useGetAllAddToCartQuery(headers);

  return (
    <div className="mr-10 sm:mr-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        {(decodedToken?.role === "admin" ||
          decodedToken?.role === "super_admin") && (
          <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">
                {getAllUser?.meta?.total ? getAllUser?.meta?.total : 0}
              </p>
              <p>Users</p>
            </div>
          </div>
        )}
        <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">
              {getAllServices?.meta?.total ? getAllServices?.meta?.total : 0}
            </p>
            <p>Total Service</p>
          </div>
        </div>
        {decodedToken?.role === "admin" ||
          decodedToken?.role === "super_admin" || (
            <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">
                  {getAllAddToCart?.data ? getAllAddToCart?.data?.length : 0}
                </p>
                <p>
                  {decodedToken?.role === "admin" ||
                  decodedToken?.role === "super_admin"
                    ? "All"
                    : "My"}{" "}
                  Wishlists
                </p>
              </div>
            </div>
          )}
        <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">
              {getMyBookings?.data ? getMyBookings?.data?.length : 0}
            </p>
            <p>
              {decodedToken?.role === "admin" ||
              decodedToken?.role === "super_admin"
                ? "All"
                : "My"}{" "}
              Bookings
            </p>
          </div>
        </div>
        <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">
              {getReviews?.data ? getReviews?.data?.length : 0}
            </p>
            <p>
              {decodedToken?.role === "admin" ||
              decodedToken?.role === "super_admin"
                ? "All"
                : "My"}{" "}
              Reviews
            </p>
          </div>
        </div>
      </div>
      {decodedToken?.role === "admin" ||
        (decodedToken?.role === "super_admin" && (
          <>
            <Users />
            <AllServices />
          </>
        ))}
      {decodedToken?.role === "user" && <CartPage />}
      <BookingsPage />
      <AllReviewsPage />
      <MyProfile />
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
