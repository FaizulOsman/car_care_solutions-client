import React from "react";
import CountUp from "react-countup";
import SectionHeader from "./SectionHeader";

const Statistic = () => {
  return (
    <div
      className="statistic text-white mb-20 h-[540px] flex"
      style={{
        backgroundImage: 'url("https://i.ibb.co/YLxFpq7/image-012.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
        backgroundPositionY: "50%",
      }}
    >
      <div className="w-2/3 mx-auto flex items-center justify-center">
        <div>
          <SectionHeader
            title="Survey Information"
            styles="text-3xl md:text-5xl text-center pb-10 border-b-4 border-white"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={9} />+
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
