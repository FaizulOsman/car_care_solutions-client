import React from "react";
import CountUp from "react-countup";
import SectionHeader from "./SectionHeader";
import SectionTopHeader from "./SectionTopHeader";

const Statistic = () => {
  return (
    <div
      className="statistic text-white mb-20 h-[540px] flex relative"
      style={{
        backgroundImage:
          'url("https://i.ytimg.com/vi/BGSYTWR-klc/maxresdefault.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
        backgroundPositionY: "50%",
      }}
    >
      <div className="absolute w-full h-full bg-black opacity-80 z-10"></div>
      <div className="w-2/3 mx-auto flex items-center justify-center z-20">
        <div>
          <div className="flex items-center justify-center flex-col">
            <SectionTopHeader
              title="GET PROFESSIONAL REPAIR"
              styles="text-md sm:text-lg lg:text-xl text-center text-[#EB3300] pb-3"
            />
            <SectionHeader
              title="Customer Feedback and Satisfaction Survey"
              styles="text-3xl md:text-4xl text-center pb-10 border-b-2 border-white"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EB3300]">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={9} />+
              </h1>
              <p className="mt-3">Total Services</p>
            </div>
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EB3300]">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={1200} />
                +
              </h1>
              <p className="mt-3">Total Users</p>
            </div>
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EB3300]">
                <CountUp scrollSpyDelay={2} enableScrollSpy={true} end={90} />%
              </h1>
              <p className="mt-3">Clients are from references</p>
            </div>
            <div className="text-center mt-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EB3300]">
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
