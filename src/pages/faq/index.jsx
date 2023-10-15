import React from "react";
import RootLayout from "../../layouts/RootLayout";
import { useGetAllFaqQuery } from "../../redux/faq/faqApi";

const FAQPage = () => {
  const { data: allFaq } = useGetAllFaqQuery();
  console.log(allFaq?.data);
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-center pb-10">
        Frequently Asked Questions
      </h2>
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
    </div>
  );
};

export default FAQPage;

FAQPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
