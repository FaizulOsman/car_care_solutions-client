import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import CartPage from "./cart";
import BookingsPage from "./bookings";
import Users from "./users";
import AllServices from "./service/all-service";
import MyProfile from "./my-profile";

const jwt = require("jsonwebtoken");

const DashboardPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);
  console.log(decodedToken?.role);

  return (
    <div>
      {decodedToken?.role === "admin" ||
        (decodedToken?.role === "super_admin" && (
          <>
            <Users />
            <AllServices />
          </>
        ))}
      <MyProfile />
      <CartPage />
      <BookingsPage />
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
