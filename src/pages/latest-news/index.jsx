import React from "react";
import { BsArrowRight } from "react-icons/bs";
import RootLayout from "../../layouts/RootLayout";
import SectionHeader from "../../components/UI/SectionHeader";

const LatestNewsPage = () => {
  return (
    <div className="w-11/12 max-w-[1200px] mx-auto mb-20">
      <div data-aos="flip-left">
        <SectionHeader
          title="Latest News"
          styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-10"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="border rounded-md" data-aos="fade-right">
          <img
            className="w-full h-44"
            src="https://used-carz.web.app/static/media/pros-and-cons.59178ef52f80da879a13.png"
            alt=""
          />
          <div className="pl-3 mt-3 hover:scale-105 duration-300">
            <h5 className="text-gray-600 text-xs font-semibold">
              CAR BUYING TIPS
            </h5>
            <h4 className="text-xl font-semibold my-4">
              Pros and Cons of Buying a Used Hybrid
            </h4>
            <button className="btn btn-sm btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
        <div className="border rounded-md" data-aos="fade-up">
          <img
            className="w-full h-44"
            src="https://used-carz.web.app/static/media/batteries.18cb86e5fa379bcddc2f.png"
            alt=""
          />
          <div className="pl-3 mt-3 hover:scale-105 duration-300">
            <h5 className="text-gray-600 text-xs font-semibold">
              CAR BUYING TIPS
            </h5>
            <h4 className="text-xl font-semibold my-4">
              How Much Do EV Batteries Cost?
            </h4>
            <button className="btn btn-sm btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
        <div className="border rounded-md" data-aos="fade-up">
          <img
            className="w-full h-44"
            src="https://used-carz.web.app/static/media/distance.bd8fc41ad99e45a53c49.png"
            alt=""
          />
          <div className="pl-3 mt-3 hover:scale-105 duration-300">
            <h5 className="text-gray-600 text-xs font-semibold">CAR TIPS</h5>
            <h4 className="text-xl font-semibold my-4">
              How Many Miles Is Too High for a Used Car?
            </h4>
            <button className="btn btn-sm btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
        <div className="border rounded-md" data-aos="fade-left">
          <img
            className="w-full h-44"
            src="https://used-carz.web.app/static/media/awd-vs-4wd.962bd88fe92130127239.png"
            alt=""
          />
          <div className="pl-3 mt-3 hover:scale-105 duration-300">
            <h5 className="text-gray-600 text-sm font-semibold">
              CAR SHOPPING
            </h5>
            <h4 className="text-xl font-semibold my-4">
              AWD vs. 4WD: What is the Difference Between Them
            </h4>
            <button className="btn btn-sm btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h5 className="text-gray-400 text-sm font-semibold">Recent Articles</h5>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 border-b-2 pb-6">
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            Finding the Best Value for Your Used Truck
          </h4>
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            How to Assess the Value of your Used Car
          </h4>
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            Why EVs Could Cost Less in the Long Run
          </h4>
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            What Not to Say When Buying a Car
          </h4>
        </div>
        <div className="text-center mt-4">
          <button className="text-primary hover:text-secondary text-xl font-semibold">
            <div className="flex items-center gap-4">
              Read More Articles <BsArrowRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsPage;

LatestNewsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
