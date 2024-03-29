import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGetAllUsersQuery } from "../../redux/user/userApi";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import { useGetMyBookingsQuery } from "../../redux/booking/bookingApi";
import { useGetMyReviewsQuery } from "../../redux/review/reviewApi";
import { useGetAllAddToCartQuery } from "../../redux/addToCart/addToCartApi";
import { SlCalender } from "react-icons/sl";
import {
  MdOutlineMiscellaneousServices,
  MdOutlineRateReview,
} from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import ServiceRatingsChart from "../../components/UI/Charts/ServiceRatingsChart";
import ServicePositionChart from "../../components/UI/Charts/ServicePositionChart";
import ServiceBookedChart from "../../components/UI/Charts/ServiceBookedChart";
import BlogAndMediaChart from "../../components/UI/Charts/BlogAndMediaChart";
import ServiceProvidingTimeChart from "../../components/UI/Charts/ServiceProvidingTimeChart";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import PlaceholderLoader from "../../components/UI/Loader/PlaceholderLoader";

const jwt = require("jsonwebtoken");

const DashboardPage = () => {
  const [showChart, setShowChart] = useState(false);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const { data: getAllUser } = useGetAllUsersQuery({ headers });
  const { data: getAllServices } = useGetAllServiceQuery({
    searchValue: "",
    status: "",
  });
  const { data: getMyBookings } = useGetMyBookingsQuery(headers);
  const { data: getReviews } = useGetMyReviewsQuery(headers);
  const { data: getAllAddToCart } = useGetAllAddToCartQuery(headers);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setShowChart(true);
      }, 3000);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(decodedToken?.role === "admin" ||
          decodedToken?.role === "super_admin") && (
          <Link
            href="dashboard/users"
            className="bg-[#161921] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-info font-medium group"
          >
            <div className="flex justify-center items-center w-14 h-14 bg-info rounded-full transition-all duration-300 transform group-hover:rotate-12">
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
              <p className="text-2xl md:text-3xl font-bold text-info mb-2">
                {getAllUser?.meta?.total ? getAllUser?.meta?.total : 0}
              </p>
              <p>TOTAL USERS</p>
            </div>
          </Link>
        )}
        <Link
          href="dashboard/service/all-service"
          className="bg-[#161921] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-secondary font-medium group"
        >
          <div className="flex justify-center items-center w-14 h-14 bg-secondary rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <MdOutlineMiscellaneousServices className="text-white w-7 h-7" />
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold text-secondary mb-2">
              {getAllServices?.meta?.total ? getAllServices?.meta?.total : 0}
            </p>
            <p>TOTAL SERVICES</p>
          </div>
        </Link>
        {decodedToken?.role === "admin" ||
          decodedToken?.role === "super_admin" || (
            <Link
              href="dashboard/cart"
              className="bg-[#161921] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-error font-medium group"
            >
              <div className="flex justify-center items-center w-14 h-14 bg-error rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <FaRegHeart className="text-white w-7 h-7" />
              </div>
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-bold text-error mb-2">
                  {getAllAddToCart?.data ? getAllAddToCart?.data?.length : 0}
                </p>
                <p>
                  {decodedToken?.role === "admin" ||
                  decodedToken?.role === "super_admin"
                    ? "ALL"
                    : "MY"}{" "}
                  WISHLISTS
                </p>
              </div>
            </Link>
          )}
        <Link
          href="dashboard/bookings"
          className="bg-[#161921] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-success font-medium group"
        >
          <div className="flex justify-center items-center w-14 h-14 bg-success rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <SlCalender className="text-white w-7 h-7" />
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold text-success mb-2">
              {getMyBookings?.data ? getMyBookings?.data?.length : 0}
            </p>
            <p>
              {decodedToken?.role === "admin" ||
              decodedToken?.role === "super_admin"
                ? "ALL"
                : "MY"}{" "}
              BOOKINGS
            </p>
          </div>
        </Link>
        <Link
          href="dashboard/reviews"
          className="bg-[#161921] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-warning font-medium group"
        >
          <div className="flex justify-center items-center w-14 h-14 bg-warning rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <MdOutlineRateReview className="text-white w-7 h-7" />
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-bold text-warning mb-2">
              {getReviews?.data ? getReviews?.data?.length : 0}
            </p>
            <p>
              {decodedToken?.role === "admin" ||
              decodedToken?.role === "super_admin"
                ? "ALL"
                : "MY"}{" "}
              REVIEWS
            </p>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-4 sm:pt-7">
        {showChart ? <ServiceBookedChart /> : <PlaceholderLoader />}
        <div className="flex flex-col sm:flex-row gap-4">
          {showChart ? <ServicePositionChart /> : <PlaceholderLoader />}
          {showChart ? <ServiceRatingsChart /> : <PlaceholderLoader />}
        </div>
      </div>
      <div className="lg:flex gap-4 pt-4 sm:pt-7">
        {showChart ? <BlogAndMediaChart /> : <PlaceholderLoader />}
        <div className="w-full lg:w-1/3 pt-7 lg:pt-0">
          {showChart ? <ServiceProvidingTimeChart /> : <PlaceholderLoader />}
        </div>
      </div>
      {/* {decodedToken?.role === "admin" ||
        (decodedToken?.role === "super_admin" && (
          <div className="pt-4 sm:pt-7">
            <Users />
            <AllServices />
          </div>
        ))}
      {decodedToken?.role === "user" && <CartPage />}
      <BookingsPage />
      <AllReviewsPage />
      {decodedToken?.role === "admin" ||
        (decodedToken?.role === "super_admin" && (
          <>
            <AllFeedbackPage />
          </>
        ))}
      <MyProfile /> */}
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
