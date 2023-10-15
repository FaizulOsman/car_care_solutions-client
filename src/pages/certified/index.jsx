import React from "react";
import { BsArrowRight } from "react-icons/bs";
import RootLayout from "../../layouts/RootLayout";

const CertifiedSection = () => {
  const certifiedData = [
    { img: "https://i.ibb.co/DW6SrYJ/Certified1.png", name: "Acura Certified" },
    { img: "https://i.ibb.co/t3PwntQ/Certified2.png", name: "Audi Certified" },
    { img: "https://i.ibb.co/93HwkwS/Certified3.png", name: "BMW Certified" },
    { img: "https://i.ibb.co/zVFzXQr/Certified4.png", name: "Buick Certified" },
    {
      img: "https://i.ibb.co/dKhskkS/Certified5.png",
      name: "Cadillac Certified",
    },
    {
      img: "https://i.ibb.co/5GsxS0L/Certified6.png",
      name: "Chevrolet Certified",
    },
    {
      img: "https://i.ibb.co/x8LD6yT/Certified7.png",
      name: "Chrysler Certified",
    },
    { img: "https://i.ibb.co/LSSp5TT/Certified8.png", name: "Dodge Certified" },
    { img: "https://i.ibb.co/YTwt22G/Certified9.png", name: "FIAT Certified" },
    { img: "https://i.ibb.co/6DgKPC8/Certified10.png", name: "Ford Certified" },
    {
      img: "https://i.ibb.co/YyPKc48/Certified11.png",
      name: "Tesla Certified",
    },
    {
      img: "https://i.ibb.co/WfmZHZk/Certified12.png",
      name: "Porsche Certified",
    },
    {
      img: "https://i.ibb.co/DVJFg6R/Certified13.png",
      name: "Honda Certified",
    },
    {
      img: "https://i.ibb.co/smkjmGN/Certified14.png",
      name: "Toyota Certified",
    },
    { img: "https://i.ibb.co/9wgySxV/Certified15.png", name: "Ram Certified" },
  ];
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto my-28">
      <div data-aos="flip-right">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Certified Pre-Owned Cars
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-14 border-b-2 pb-6">
        {certifiedData.map((data, i) => (
          <div data-aos="fade-up" key={i}>
            <div className="border rounded-lg hover:bg-gray-100 hover:scale-110 duration-300 p-5 flex flex-col justify-center items-center">
              <img className="w-24 h-16" src={data?.img} alt="" />
              <p className="text-primary font-bold">{data?.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <div className="text-primary font-bold cursor-pointer">
          <div className="flex gap-4 items-center justify-center">
            <span className="mr-2 hover:tracking-wider duration-300">
              Show All Certified Pre-Owned Programs
            </span>
            <BsArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertifiedSection;

CertifiedSection.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
