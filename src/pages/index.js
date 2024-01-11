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
import MetaData from "../components/Head/MetaData";

const HomePage = () => {
  return (
    <div>
      <MetaData
        title="Car Care Solutions"
        keywordContent="Regulars Package,Standard Package,Premium Package,regulars,standard,premium,car service,car care,car wash,car solution,car repair,car remake,car,wash,service"
      />
      <Hero />
      <AboutUs />
      <ServicesPage />
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
