import React from "react";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import { TiTick } from "react-icons/ti";

const ServicesPage = () => {
  const { data: allService } = useGetAllServiceQuery();
  console.log(allService?.data);
  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center pb-10">
          Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {allService?.data?.map((service, index) => (
            <div key={index} className="border rounded-sm relative pb-24">
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
                  <li key={index} className="flex items-center gap-4 mb-1">
                    <TiTick className="text-green-500" />
                    {facility}
                  </li>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 border-t w-full text-center p-4">
                <button className="btn btn-md bg-[#19457c] hover:bg-[#0f2b4e] text-white rounded-full px-10">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
