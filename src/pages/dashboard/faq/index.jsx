import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const AllFaq = () => {
  return <div>faq</div>;
};

export default AllFaq;

AllFaq.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
