import React, { useEffect, useState } from "react";
import RootLayout from "../../layouts/RootLayout";
import { useGetAllReviewQuery } from "../../redux/review/reviewApi";

// import Swiper core and required modules
import { Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import SectionHeader from "../../components/UI/SectionHeader";
import Loader from "../../components/UI/Loader";
import SectionTopHeader from "../../components/UI/SectionTopHeader";

const ClientReviewsPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getAllReview } = useGetAllReviewQuery(headers);

  return (
    <div
      style={{
        backgroundImage: "url(https://i.ibb.co/VQq5vGj/road-shape-1-1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
      }}
      className="bg-[#f5f5f5] py-14"
    >
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-center flex-col">
          <SectionTopHeader
            title="OUR HAPPY CUSTOMERS"
            styles="text-md sm:text-lg lg:text-xl text-center text-[#EB3300] pb-3"
          />
          <SectionHeader
            title="What Customer Says"
            styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-5"
          />
          <p className="text-center max-w-lg mx-auto pb-10">
            Client Testimonials Highlighting the Unmatched Quality and
            Exceptional Service in Car Maintenance.
          </p>
          {getAllReview ? (
            <>
              {getAllReview?.data?.length > 0 ? (
                <Swiper
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                  }}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[FreeMode, Pagination]}
                  className="max-w-[100%]"
                >
                  {getAllReview?.data.map((review, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative bg-white hover:bg-gray-50 border flex flex-col mb-20 group shadow-lg rounded-xl px-6 pt-8 pb-10 cursor-pointer">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${review.backgroundImage})`,
                          }}
                        />
                        <div className="relative flex flex-col gap-3 justify-center items-center min-h-[220px]">
                          <img
                            className="absolute -bottom-[80px] rounded-full w-[90px] h-[90px] border-2 border-white"
                            src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${
                              index + 1
                            }).jpg`}
                            alt="avatar"
                          />
                          <div className="text-center w-full shrink-0 grow-0 basis-auto">
                            <p className="mb-2 font-bold">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 96 960 960"
                                className="inline-block w-8 text-[#EB3300]"
                              >
                                <path
                                  fill="currentColor"
                                  d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z"
                                />
                              </svg>
                            </p>
                            <p className="mb-2">
                              {'"'}
                              {review.review}
                              {'"'}
                            </p>
                            <ul className="mb-8 flex justify-center">
                              {Array.from({ length: review?.rating }).map(
                                (_, i) => (
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
                                )
                              )}
                              {Array.from({ length: 5 - review?.rating }).map(
                                (_, i) => (
                                  <li key={i}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 96 960 960"
                                      className="w-5 text-gray-400"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                                      />
                                    </svg>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <h2 className="text-2xl font-bold text-red-500 text-center py-10">
                  No Data Found
                </h2>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientReviewsPage;

ClientReviewsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
