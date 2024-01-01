import React from "react";
import ServicesPage from "./services";
import RootLayout from "../layouts/RootLayout";
import Hero from "../components/UI/Hero";
import LatestNewsPage from "./latest-news";
import CertifiedSection from "./certified";
import ClientReviewsPage from "./client-reviews";
import Survey from "../components/UI/Survey";
import FAQPage from "./faq";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServicesPage />
      {/* <UpcomingServicesPage /> */}
      <ClientReviewsPage />
      {/* <Event /> */}
      <LatestNewsPage />
      <Survey />
      <CertifiedSection />
      <FAQPage />
      {/* <FeedbackPage /> */}
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
