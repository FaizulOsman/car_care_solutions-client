import React from "react";
import { TiTick } from "react-icons/ti";
import RootLayout from "../../../layouts/RootLayout";
import { useGetAllServiceQuery } from "../../../redux/service/serviceApi";
import Loader from "../../../components/UI/Loader";

const UpcomingServicesPage = () => {
  const { data: allService } = useGetAllServiceQuery();

  let upcomingServices = allService?.data?.filter(
    (data) => data.status === "upcoming"
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center pb-10 pt-20">
          Upcoming Services
        </h1>
        {upcomingServices?.length > 0 ? (
          <>
            {upcomingServices?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {upcomingServices?.map((service, index) => (
                  <div
                    key={index}
                    className="border rounded-sm relative pb-24 hover:shadow-lg"
                  >
                    <div
                      className="px-4"
                      style={{
                        backgroundImage:
                          "url('https://www.mobilecarwash.com/img/frontend/packages-img.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "160px",
                      }}
                    >
                      <h4 className="text-center text-white font-bold text-xl pt-3">
                        {service?.type}
                      </h4>
                      <h4 className="text-center text-white font-bold text-xl md:text-2xl pt-9">
                        ${service?.price}
                      </h4>
                    </div>
                    <div className="px-4 bg-[#19457c] text-white my-4">
                      <h4 className="font-bold text-xl py-3">Facilities</h4>
                    </div>
                    <div className="px-4">
                      {service?.facilities?.map((facility, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-4 mb-1"
                        >
                          <TiTick className="text-green-500" />
                          {facility}
                        </li>
                      ))}
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
