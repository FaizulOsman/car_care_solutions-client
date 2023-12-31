import React, { useEffect, useState } from "react";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import { TiTick } from "react-icons/ti";
import RootLayout from "../../layouts/RootLayout";
import toast from "react-hot-toast";
import { useCreateAddToCartMutation } from "../../redux/addToCart/addToCartApi";
import Loader from "../../components/UI/Loader";
import { RxCross2 } from "react-icons/rx";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SectionHeader from "../../components/UI/SectionHeader";

const jwt = require("jsonwebtoken");

const ServicesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(6);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const { data: allService } = useGetAllServiceQuery(searchValue);

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
    "Exterior Hand Wash",
    "Rims + Tire Shine",
    "Full Vacuum",
    "Shampoo Seats",
    "Interior Wipe Down",
    "Deep Leather Cleaning",
  ];

  let ongoingServices = allService?.data
    ?.filter((data) => data.status === "ongoing")
    .slice(0, limit);

  useEffect(() => {
    // Update the limit based on the length of ongoingServices
    if (ongoingServices && ongoingServices.length < limit) {
      setLimit(ongoingServices.length);
    }
  }, [ongoingServices, limit]);

  useEffect(() => {
    if (createAddToCartIsSuccess) {
      toast.success("Service added to cart successfully!");
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
    <div>
      <div className="mb-20">
        <SectionHeader
          title="Services"
          styles="text-2xl sm:text-3xl lg:text-4xl text-center text-ble-500 pb-5"
        />
        <p className="text-center max-w-lg mx-auto pb-5">
          Feel free to contact us at any time. We have a dedicated team to
          provide you the best support.
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-7">
          <div className="w-56 sm:w-64 mx-auto sm:mx-0">
            <input
              className="bg-transparent shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search for services"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="max-w-7xl mx-auto sm:mx-0 flex flex-col gap-2">
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
                  ongoingServices && ongoingServices.length < limit
                    ? "opacity-50 cursor-not-allowed"
                    : "border-gray-500 text-gray-500"
                } `}
                disabled={ongoingServices && ongoingServices.length < limit}
              >
                <BiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {ongoingServices?.length > 0 ? (
          <>
            {ongoingServices?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {ongoingServices?.map((service, index) => (
                  <div
                    key={index}
                    class="relative flex justify-between flex-col bg-clip-border border border-blue-200 rounded-xl shadow-blue-300 shadow-md hover:shadow-2xl w-full p-8 hover:scale-105 duration-300"
                  >
                    <div class="relative pb-8 m-0 mb-8 overflow-hidden text-center bg-transparent border-b rounded-none shadow-none bg-clip-border border-blue-300">
                      <p class="block font-sans text-sm antialiased font-semibold text-blue-500  leading-normal uppercase">
                        {service?.type}
                      </p>
                      <h1 class="text-blue-500 flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-2xl md:text-3xl lg:text-5xl">
                        <span class="mt-2 text-xl lg:text-2xl">$</span>
                        {service?.price}
                      </h1>
                    </div>
                    <div class="p-0">
                      <ul class="flex flex-col gap-4">
                        {service?.facilities?.map((facility, index) => (
                          <li key={index} class="flex items-center gap-4">
                            <span class="p-1 border rounded-full border-gray-300 bg-gray-50">
                              <TiTick className="text-blue-500" />
                            </span>
                            <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                              {facility}
                            </p>
                          </li>
                        ))}
                        {facilities?.map(
                          (f, index) =>
                            !service?.facilities?.includes(f) && (
                              <li key={index} class="flex items-center gap-4">
                                <span class="p-1 border rounded-full border-gray-300 bg-gray-50">
                                  <RxCross2 className="text-red-500" />
                                </span>
                                <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                  {f}
                                </p>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                    <div class="p-0 mt-12">
                      <button
                        onClick={() => handleAddToCart(service?.id)}
                        class="w-full btn border hover:bg-white hover:border-blue-500 hover:text-blue-500 bg-blue-500 text-white"
                      >
                        Book Now
                      </button>
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
    </div>
  );
};

export default ServicesPage;

ServicesPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
