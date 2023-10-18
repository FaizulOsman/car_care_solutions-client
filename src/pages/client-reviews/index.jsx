import React, { useState, useEffect } from "react";
import RootLayout from "../../layouts/RootLayout";
import { useGetAllReviewQuery } from "../../redux/review/reviewApi";

const ClientReviewsPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getAllReview } = useGetAllReviewQuery(headers);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mx-auto md:px-6 mt-20">
      <section className="text-center h-[400px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-12">
          Client Reviews
        </h2>

        <div
          id="carouselExampleCaptions"
          className="relative"
          data-te-carousel-init
          data-te-carousel-slide
        >
          {getAllReview?.data?.map((review, index) => (
            <div
              key={index}
              className={`mb-32 relative float-left ${
                index === activeIndex ? "" : "-mr-[100%] hidden"
              } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
              data-te-carousel-active={index === activeIndex}
              data-te-carousel-item
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                className="mx-auto mb-6 rounded-full shadow-lg dark:shadow-black/20 w-[150px]"
                src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${
                  index + 1
                }).jpg`}
                alt="avatar"
              />
              <div className="flex flex-wrap justify-center">
                <div className="w-full shrink-0 grow-0 basis-auto px-3 lg:w-8/12">
                  <h5 className="mb-2 text-lg font-bold">{review.name}</h5>
                  <p className="mb-4 font-medium text-neutral-700 dark:text-neutral-400">
                    {review.type} - ${review?.price}
                  </p>
                  <p className="mb-6 ">
                    {review.review}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 96 960 960"
                      className="inline-block w-6"
                    >
                      <path
                        fill="currentColor"
                        d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                      />
                    </svg>
                  </p>
                  <ul className="mb-0 flex justify-center">
                    {Array.from({ length: review?.rating }).map((_, i) => (
                      <li key={i}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 96 960 960"
                          className="w-5 text-warning"
                        >
                          <path
                            fill="currentColor"
                            d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                          />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <button
            className="absolute top-32 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            onClick={() =>
              setActiveIndex(
                (prevIndex) =>
                  (prevIndex - 1 + getAllReview?.data?.length) %
                  getAllReview?.data?.length
              )
            }
          >
            <span className="inline-block h-8 w-8">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="text-neutral-600 dark:text-neutral-300"
              >
                <path
                  fill="currentColor"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>
          <button
            className="absolute top-32 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            onClick={() =>
              setActiveIndex(
                (prevIndex) => (prevIndex + 1) % getAllReview?.data?.length
              )
            }
          >
            <span className="inline-block h-8 w-8">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="text-neutral-600 dark:text-neutral-300"
              >
                <path
                  fill="currentColor"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ClientReviewsPage;

ClientReviewsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
