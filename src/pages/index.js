import RootLayout from "@/layouts/RootLayout";
import React from "react";
import ServicesPage from "./services";

const HomePage = () => {
  return (
    <div>
      <ServicesPage />
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
