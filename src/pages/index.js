import React from "react";
import ServicesPage from "./services";
import RootLayout from "../layouts/RootLayout";

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
