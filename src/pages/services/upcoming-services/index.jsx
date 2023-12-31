import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import RootLayout from "../../../layouts/RootLayout";
import { useGetAllServiceQuery } from "../../../redux/service/serviceApi";
import Loader from "../../../components/UI/Loader";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const UpcomingServicesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(3);

  let facilities = [
    "Exterior Hand Wash",
    "Rims + Tire Shine",
    "Deep Leather Cleaning",
    "Executive Interior Detailing",
    "Deluxe Wax Protection",
    "Full exterior body clay treatment",
  ];

  const { data: allService } = useGetAllServiceQuery(searchValue);

  let upcomingServices = allService?.data
    ?.filter((data) => data.status === "upcoming")
    .slice(0, limit);

  useEffect(() => {
    // Update the limit based on the length of upcomingServices
    if (upcomingServices && upcomingServices.length < limit) {
      setLimit(upcomingServices.length);
    }
  }, [upcomingServices, limit]);

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center pb-10">
          Upcoming Services
        </h1>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-7">
          <div className="max-w-7xl mx-auto sm:mx-0">
            <input
              className="bg-transparent shadow appearance-none border border-blue-500 rounded max-w-4xl py-2 px-3 text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search for services"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="max-w-7xl mx-auto sm:mx-0 flex flex-col gap-2">
            <select
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="select select-bordered border border-blue-500 rounded px-3 text-gray-400 font-normal select-xs sm:select-sm max-w-xs"
            >
              <option value="">Find Service</option>
              <option value="PLATINUM DETAILING PACKAGE">
                PLATINUM DETAILING PACKAGE
              </option>
              <option value="WAX">WAX</option>
              <option value="INTERIOR CAR DETAILING">
                INTERIOR CAR DETAILING
              </option>
              <option value="BASIC">BASIC</option>
              <option value="CLASSIC">CLASSIC</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="DELUXE">DELUXE</option>
              <option value="EXECUTIVE">EXECUTIVE</option>
              <option value="ULTIMATE PAINT CORRECTION">
                ULTIMATE PAINT CORRECTION
              </option>
            </select>
            <div className="ml-auto text-xs inline-flex items-center">
              <span className="mr-3 hidden sm:inline-block text-gray-400">
                Limit {limit}
              </span>
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
                  upcomingServices && upcomingServices.length < limit
                    ? "opacity-50 cursor-not-allowed"
                    : "border-gray-500 text-gray-500"
                } `}
                disabled={upcomingServices && upcomingServices.length < limit}
              >
                <BiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {upcomingServices?.length > 0 ? (
          <>
            {upcomingServices?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {upcomingServices?.map((service, index) => (
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
                                <span class="p-1 border rounded-full border-white/20 bg-white/20">
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
                        class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                        disabled={true}
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

export default UpcomingServicesPage;

UpcomingServicesPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
