import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardPage = () => {
  return <div>Dashboard page</div>;
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
