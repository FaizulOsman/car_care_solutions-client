import React from "react";
import ServicesPage from "./services";
import RootLayout from "../layouts/RootLayout";
import Hero from "../components/UI/Hero";
import FeedbackPage from "./feedback";
import LatestNewsPage from "./latest-news";
import CertifiedSection from "./certified";
import ClientReviewsPage from "./client-reviews";
import FAQPage from "./faq";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServicesPage />
      <LatestNewsPage />
      <CertifiedSection />
      <ClientReviewsPage />
      <FAQPage />
      <FeedbackPage />
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
