import React from "react";
import ServicesPage from "./services";
import RootLayout from "../layouts/RootLayout";
import Hero from "../components/UI/Hero";
import LatestNewsPage from "./latest-news";
import CertifiedSection from "./certified";
import ClientReviewsPage from "./client-reviews";
import Survey from "../components/UI/Survey";
import FAQPage from "./faq";
import ContactUs from "./contact-us";
import AboutUs from "./about-us";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <ServicesPage />
      {/* <UpcomingServicesPage /> */}
      {/* <Event /> */}
      <LatestNewsPage />
      <Survey />
      <CertifiedSection />
      <ClientReviewsPage />
      <FAQPage />
      <ContactUs />
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
