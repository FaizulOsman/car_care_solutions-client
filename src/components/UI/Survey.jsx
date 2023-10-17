import React from "react";
import CountUp from "react-countup";

const Statistic = () => {
  return (
    <div
      className="statistic text-white my-32 h-[600px]"
      style={{
        backgroundImage:
          'url("https://ar.happyvalentinesday2020.online/pics/cardetailingshop.ca/wp-content/uploads/2018/07/car-detailing-shop.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
        backgroundPositionY: "50%",
      }}
    >
      <div className="w-2/3 mx-auto flex items-center justify-center">
        <div className="h-full">
          <h2 className="text-center text-3xl md:text-5xl pb-10 mt-20 md:mt-24 lg:mt-32 font-bold border-b-4 border-white">
            Survey Information
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={6} />+
              </h1>
              <p className="mt-3">Total Services</p>
            </div>
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={1200} />
                +
              </h1>
              <p className="mt-3">Total Users</p>
            </div>
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={90} />%
              </h1>
              <p className="mt-3">Clients are from references</p>
            </div>
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={100} />+
              </h1>
              <p className="mt-3">Booked Services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
