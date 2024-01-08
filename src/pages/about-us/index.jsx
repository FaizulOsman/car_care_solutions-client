import React from "react";
import SectionTopHeader from "../../components/UI/SectionTopHeader";
import SectionHeader from "../../components/UI/SectionHeader";
import RootLayout from "../../layouts/RootLayout";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="w-11/12 max-w-[1200px] mx-auto pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div className="relative">
          <div className="z-20">
            <img
              className="w-[75%] sm:w-[50%] lg:w-[75%] z-20"
              src="https://i.ibb.co/RP0Tpk5/about-2.png"
              alt=""
            />
          </div>
          <div
            id="about-us-animation-left-right"
            className="w-[50%] sm:w-[40%] lg:w-[50%] absolute top-[15%] right-5 z-20"
          >
            <img
              className="w-full border-4 border-white"
              src="https://themeholy.com/wordpress/malen/wp-content/uploads/2023/05/about_3.png"
            />
          </div>
          <div
            id="about-us-animation-top-bottom"
            className="w-[50%] sm:w-[30%] lg:w-[53%] absolute top-2 right-1 sm:right-[20%] sm:top-[6%] lg:right-1 lg:-top-4"
          >
            <img
              className="w-full"
              src="https://themeholy.com/wordpress/malen/wp-content/uploads/2023/05/about_dots.png"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center flex-col">
            <SectionTopHeader
              title="ABOUT US"
              styles="text-md sm:text-lg lg:text-xl text-center text-[#EB3300] pb-3"
            />
            <SectionHeader
              title="Experience superior car Repair with us"
              styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-5 xl:pb-10"
            />
            <p className="mb-10 lg:mb-5 xl:mb-10">
              Quality repairs that you can trust every time means that you can
              rely on the repair services to fix your vehicle correctly,
              Efficiently, and safely.
            </p>
          </div>
          <div className="flex justify-between items-center gap-8 mb-10 lg:mb-5 xl:mb-10">
            <div>
              <div className="flex gap-6 items-center pb-5 mb-5 border-b">
                <img
                  src="https://themeholy.com/wordpress/malen/wp-content/uploads/2023/05/success.svg"
                  alt=""
                />
                <div className="">
                  <h3 className="text-xl font-bold mb-2">
                    Award Wining Company
                  </h3>
                  <p className="text-[#4B4B4B]">
                    Award-winning companies often excel in areas such as
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <img
                  src="https://themeholy.com/wordpress/malen/wp-content/uploads/2023/05/phone_1.svg"
                  alt=""
                />
                <div className="">
                  <h3 className="text-xl font-bold mb-2">Friendly Support</h3>
                  <p className="text-[#4B4B4B]">
                    Award-winning companies often excel in areas such as
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundImage:
                  "url(	https://themeholy.com/wordpress/malen/wp-content/uploads/2023/05/about_img2.png)",
                backgroundRepeat: "no-repeat",
              }}
              className="hidden w-[164px] h-[214px] text-white sm:flex flex-col justify-center px-5 gap-2"
            >
              <h3 className="text-4xl font-bold">29+</h3>
              <h4 className="text-lg font-semibold">Years Experience</h4>
            </div>
          </div>
          <Link href="/about-us">
            <button className="w-44 mx-auto lg:mx-0 flex justify-center items-center gap-2 hover:gap-4 text-white bg-[#EB3300] hover:bg-[#d13509] duration-200 text-center py-[12px] sm:py-[14px] rounded-md">
              <span>About More</span> <FaArrowRightLong />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

AboutUs.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
