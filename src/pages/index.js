import React from "react";
import ServicesPage from "./services";
import RootLayout from "../layouts/RootLayout";
import Hero from "../components/UI/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServicesPage />
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
