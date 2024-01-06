import React from "react";
import RootLayout from "../../layouts/RootLayout";
import { useGetAllFaqQuery } from "../../redux/faq/faqApi";
import Loader from "../../components/UI/Loader";
import SectionHeader from "../../components/UI/SectionHeader";
import SectionTopHeader from "../../components/UI/SectionTopHeader";

const FAQPage = () => {
  const { data: allFaq } = useGetAllFaqQuery();

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto mb-20 mt-10">
      <div className="flex items-center justify-center flex-col">
        <SectionTopHeader
          title="FAQ"
          styles="text-md sm:text-lg lg:text-xl text-center text-[#EB3300] pb-3"
        />
        <SectionHeader
          title="Frequently Asked Questions"
          styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-10"
        />
      </div>

      {allFaq?.data?.length > 0 ? (
        <>
          {allFaq?.data?.length > 0 ? (
            <div className="join join-vertical w-full">
              {allFaq?.data?.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    {faq?.question}
                  </div>
                  <div className="collapse-content">
                    <p>{faq?.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-xl sm:text-2xl py-20 text-center text-red-500">
              No data found
            </h1>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FAQPage;

FAQPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
