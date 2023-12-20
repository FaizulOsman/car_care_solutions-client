import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="pb-20 -mt-14">
      <div
        className="h-[260px] md:h-[300px] lg:h-[460px]"
        style={{
          background: `url(https://i.ibb.co/3S5dnds/banner.jpg)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <h3
          style={{
            textShadow: "0 8px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.6)",
          }}
          className="text-3xl sm:text-4xl lg:text-5xl text-center text-white pt-20 font-bold hover:tracking-widest duration-300"
        >
          Reliable Care <br />
          for Your Auto Needs
        </h3>
      </div>

      <div
        data-aos="fade-up"
        className="border-4 bg-base-100 mt-10 lg:-mt-24 lg:w-8/12 mx-auto rounded-lg"
      >
        <h3 className="text-3xl font-semibold text-center text-blue-500 mt-5">
          Tell us what you are looking for
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-5 px-10 pb-10">
          <select className="select select-bordered w-full">
            <option>Select a Make</option>
            <option>Ultimate Paint Correction</option>
            <option>Executive</option>
            <option>Deluxe</option>
            <option>Premium</option>
            <option>Classic</option>
            <option>Basic</option>
            <option>WAX</option>
            <option>Interior Car Detailing</option>
          </select>
          <select disabled className="select select-bordered w-full">
            <option>Select a Model</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <input
            type="text"
            placeholder="Zip Code"
            className="input input-bordered w-full"
          />
          <Link href="/services">
            <button
              className={`bg-gradient-to-r from-green-500 to-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 text-white w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white`}
            >
              Let{"'"}s Go
            </button>
          </Link>
        </div>

        <div className="border-t bg-gray-100 p-4 flex flex-wrap justify-around gap-3">
          <Link href="/services">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              Browse by Price or Payments
            </button>
          </Link>
          <Link href="/services">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              Browse by Brand
            </button>
          </Link>
          <Link href="/services">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              See Services Near You
            </button>
          </Link>
          <Link href="/services">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              Articles & Tips
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
