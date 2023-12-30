import React, { useEffect, useState } from "react";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import { TiTick } from "react-icons/ti";
import RootLayout from "../../layouts/RootLayout";
import toast from "react-hot-toast";
import { useCreateAddToCartMutation } from "../../redux/addToCart/addToCartApi";
import Loader from "../../components/UI/Loader";
import { RxCross2 } from "react-icons/rx";

const jwt = require("jsonwebtoken");

const ServicesPage = () => {
  const [searchValue, setSearchValue] = useState("");

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

  let ongoingServices = allService?.data?.filter(
    (data) => data.status === "ongoing"
  );

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
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center pb-10">
          Services
        </h1>
        <div className="pb-7 sm:pb-10 text-center">
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for services"
            className="input input-sm sm:input-md input-bordered border-blue-500 w-full max-w-xs"
          />
        </div>
        {ongoingServices?.length > 0 ? (
          <>
            {ongoingServices?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {ongoingServices?.map((service, index) => (
                  <div
                    key={index}
                    class="relative flex justify-between flex-col bg-clip-border rounded-xl bg-gradient-to-b text-white from-green-500 to-blue-500 shadow-gray-900/20 shadow-md w-full p-8 hover:scale-105 duration-300"
                  >
                    <div class="relative pb-8 m-0 mb-8 overflow-hidden text-center bg-transparent border-b rounded-none shadow-none bg-clip-border border-white">
                      <p class="block font-sans text-sm antialiased font-normal leading-normal uppercase">
                        {service?.type}
                      </p>
                      <h1 class="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-2xl md:text-3xl lg:text-5xl">
                        <span class="mt-2 text-xl lg:text-2xl">$</span>
                        {service?.price}
                      </h1>
                    </div>
                    <div class="p-0">
                      <ul class="flex flex-col gap-4">
                        {service?.facilities?.map((facility, index) => (
                          <li key={index} class="flex items-center gap-4">
                            <span class="p-1 border rounded-full border-white/20 bg-white/20">
                              <TiTick />
                              {/* <RxCross2 /> */}
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
                                <span class="p-1 border rounded-full border-white/20 bg-white/20">
                                  <RxCross2 />
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
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
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
