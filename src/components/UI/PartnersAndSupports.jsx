import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeader from "./SectionHeader";

const PartnersAndSupports = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 2000,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 1024, // Medium devices and above
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Extra small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const images = [
    "https://i.ibb.co/zNvdDtY/brand-1-1.png",
    "https://i.ibb.co/zRGMYc1/brand-1-2.png",
    "https://i.ibb.co/Jcn9mB7/brand-1-3.png",
    "https://i.ibb.co/48xN3mH/brand-1-4.png",
    "https://i.ibb.co/6sVpmMx/brand-1-5.png",
    "https://i.ibb.co/F5m1gTc/brand-1-6.png",
  ];
  return (
    <div className="mt-10 lg:mt-16">
      <div className="relative flex justify-center m-auto">
        <p className="bg-white px-2 z-10 text-gray-600 font-semibold sm:text-lg md:text-xl">
          OUR PARTNERS & SUPPORTS
        </p>
        <div className="partnersAndSupports-hr"></div>
      </div>
      <Slider {...settings} className="max-w-[90%] mx-auto mt-14">
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt="" className="mx-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnersAndSupports;
