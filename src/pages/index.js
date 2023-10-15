import React from "react";
import ServicesPage from "./services";
import RootLayout from "../layouts/RootLayout";
import Hero from "../components/UI/Hero";
import FeedbackPage from "./feedback";
import LatestNewsPage from "./latest-news";
import CertifiedSection from "./certified";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServicesPage />
      <LatestNewsPage />
      <CertifiedSection />
      <FeedbackPage />
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
