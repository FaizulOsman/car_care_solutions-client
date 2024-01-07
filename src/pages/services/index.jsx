import React, { useEffect, useState } from "react";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import RootLayout from "../../layouts/RootLayout";
import toast from "react-hot-toast";
import { useCreateAddToCartMutation } from "../../redux/addToCart/addToCartApi";
import Loader from "../../components/UI/Loader";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SectionHeader from "../../components/UI/SectionHeader";
import SectionTopHeader from "../../components/UI/SectionTopHeader";
import { FaCheckCircle } from "react-icons/fa";

const jwt = require("jsonwebtoken");

const ServicesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [limit, setLimit] = useState(6);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const { data: allService } = useGetAllServiceQuery({
    searchValue,
    status,
    limit,
  });

  const [
    createAddToCart,
    {
      isSuccess: createAddToCartIsSuccess,
      isError: createAddToCartIsError,
      error: createAddToCartError,
    },
  ] = useCreateAddToCartMutation();

  const handleAddToCart = (id) => {
    const data = {
      serviceId: id,
      email: decodedToken?.email,
    };
    createAddToCart({ data, headers });
  };

  let facilities = [
    "Lights And Accessories",
    "Maintenance Package",
    "Exhaust System Services",
    "Brakes & Brake Repair",
    "Deep Leather Cleaning",
  ];

  useEffect(() => {
    if (createAddToCartIsSuccess) {
      toast.success("Service added to wishlist successfully!");
    }
  }, [createAddToCartIsSuccess]);

  useEffect(() => {
    if (createAddToCartIsError) {
      toast.error(
        createAddToCartError?.data?.message || "Something went wrong!"
      );
    }
  }, [createAddToCartIsError, createAddToCartError]);

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto mb-20">
      <div className="flex items-center justify-center flex-col">
        <SectionTopHeader
          title="PRICING PLAN"
          styles="text-md sm:text-lg lg:text-xl text-center text-[#EB3300] pb-3"
        />
        <SectionHeader
          title="Quality Services"
          styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-5"
        />
        <p className="max-w-[500px] mx-auto mb-5 leading-relaxed text-gray-600 text-center pb-5">
          Feel free to contact us at any time. We have a dedicated team to
          provide you the best support.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-7">
        <div className="w-56 sm:w-64 mx-auto sm:mx-0">
          <input
            className="bg-transparent shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search for services"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="max-w-7xl mx-auto sm:mx-0 flex flex-col gap-2">
          <select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            className="select select-bordered border border-gray-400 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs"
          >
            <option value="ongoing">Filter By Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <div className="ml-auto text-xs inline-flex items-center">
            <span className="mr-3 text-gray-400">Limit {limit}</span>
            <button
              onClick={() => setLimit(limit - 1)}
              className={`mr-3 inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 ${
                limit === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-500 text-gray-500"
              } leading-none`}
              disabled={limit === 1}
            >
              <BiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLimit(limit + 1)}
              className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border border-gray-500 text-gray-500 leading-none ${
                allService?.data && allService?.data.length < limit
                  ? "opacity-50 cursor-not-allowed"
                  : "border-gray-500 text-gray-500"
              } `}
              disabled={allService?.data && allService?.data.length < limit}
            >
              <BiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {allService?.data?.length > 0 ? (
        <>
          {allService?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {allService?.data?.map((service, index) => (
                <div
                  key={index}
                  className={`relative flex justify-between flex-col bg-clip-border border border-gray-200 rounded-sm shadow-gray-300 shadow-md hover:shadow-2xl w-full p-8 hover:scale-105 duration-300 ${
                    service?.type === "Standard Package" &&
                    "bg-[#0a0a0a] text-white"
                  }`}
                  style={{
                    backgroundImage:
                      "url(https://themeholy.com/wordpress/malen/wp-content/uploads/2023/05/price_bg_1.png",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="relative pb-8 m-0 mb-8 overflow-hidden bg-transparent border-b rounded-none">
                    <p className="block font-sans text-2xl antialiased font-semibold mb-4">
                      {service?.type}
                    </p>
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
                        ${service?.price}
                      </h1>
                      {service?.type === "Standard Package" && (
                        <span className="bg-[#EB3300] text-white px-3 pb-[2px] rounded-full ">
                          25% Save
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-0">
                    <ul className="flex flex-col gap-4">
                      {service?.facilities?.map((facility, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <FaCheckCircle className="text-[#EB3300]" />
                          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                            {facility}
                          </p>
                        </li>
                      ))}
                      {facilities?.map(
                        (f, index) =>
                          !service?.facilities?.includes(f) && (
                            <li key={index} className="flex items-center gap-4">
                              <FaCheckCircle className="text-gray-500" />
                              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                {f}
                              </p>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                  <div className="p-0 mt-12">
                    <button
                      onClick={() => handleAddToCart(service?.id)}
                      className={`w-full btn border border-[#EB3300] ${
                        service?.type === "Standard Package"
                          ? "hover:bg-white hover:text-[#EB3300] bg-[#EB3300] text-white"
                          : " bg-white text-[#EB3300] hover:bg-[#EB3300] hover:text-white"
                      }`}
                      disabled={status === "upcoming" && true}
                    >
                      Add To Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-xl sm:text-2xl py-20 text-center text-[#EB3300]">
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

export default ServicesPage;

ServicesPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
