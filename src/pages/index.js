import RootLayout from "@/layouts/RootLayout";
import React from "react";

const HomePage = () => {
  return <div>Hello</div>;
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
