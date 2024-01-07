import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGetAllServiceQuery } from "../../redux/service/serviceApi";
import DatePicker from "react-datepicker";
import { useCreateBookingMutation } from "../../redux/booking/bookingApi";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

const jwt = require("jsonwebtoken");

const Banner = () => {
  const [startDate, setStartDate] = useState(new Date());

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  const { data: getAllService } = useGetAllServiceQuery({
    searchValue: "",
    status: "ongoing",
  });
  const [
    createBooking,
    {
      isSuccess: createBookingIsSuccess,
      error: createBookingError,
      isError: createBookingIsError,
    },
  ] = useCreateBookingMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const findData = getAllService?.data?.find(
      (data) => data?.type === e.target.type.value
    );

    if (!decodedToken?.email) {
      toast.error("Please login first!");
    } else {
      if (!findData?.type) {
        toast.error("Please select a service!");
      } else {
        const data = {
          serviceId: findData?.id,
          type: findData?.type,
          price: findData?.price,
          email: decodedToken?.email,
          date: e.target.date.value,
          timeSlot: e.target.time.value,
          isAccepted: false,
          isRejected: false,
        };
        createBooking({ data, headers });
      }
    }
  };

  useEffect(() => {
    if (createBookingIsSuccess) {
      toast.success("Service booked successfully!");
    }
    if (createBookingIsError) {
      toast.error(createBookingError?.data?.message || "Something went wrong");
    }
  }, [createBookingIsSuccess, createBookingError, createBookingIsError]);

  return (
    <div className="pb-20 -mt-14">
      <div
        className="h-[260px] md:h-[300px] lg:h-[460px]"
        style={{
          background: `url(https://used-carz.web.app/static/media/banner.991105296df5663f9e18.jpg)`,
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
        className="w-11/12 max-w-[1200px] mx-auto border-4 bg-base-100 mt-10 lg:-mt-24 rounded-lg"
      >
        <h3 className="text-3xl font-semibold text-center text-blue-500 mt-5">
          Tell us what you are looking for
        </h3>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-5 px-10 pb-10"
        >
          <select
            name="type"
            className="select select-bordered w-full"
            required
          >
            <option>Select a Service</option>
            {getAllService?.data?.map((data, index) => (
              <option key={index} value={data?.type}>
                {data?.type}
              </option>
            ))}
          </select>
          <div className="w-full">
            <DatePicker
              name="date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM-dd-yyyy"
              className="border select select-bordered w-full"
              required
            />
          </div>
          <select
            name="time"
            className="select select-bordered w-full"
            required
          >
            <option value="10:00AM-12:00PM" selected>
              10:00AM - 12:00PM
            </option>
            <option value="12:00PM-02:00PM">12:00PM - 02:00PM</option>
            <option value="02:00PM-04:00PM">02:00PM - 04:00PM</option>
            <option value="04:00PM-06:00PM">04:00PM - 06:00PM</option>
          </select>
          <div>
            <div class="hero-bookNow">
              <div class="hero-bookNow_wrapper">
                <button
                  href={`#`}
                  type="submit"
                  className="bg-[#2ecc71] border-[3px] border-[#2ecc71] text-white hover:border-[3px] hover:text-[#2ecc71]"
                >
                  Book Now
                </button>
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 268.832 268.832"
                    className="fill-[#2ecc71]"
                  >
                    <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="border-t bg-gray-100 p-4 flex flex-wrap justify-around gap-3">
          <Link href="/services">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              Browse All Ongoing Services
            </button>
          </Link>
          <Link href="/services/upcoming-services">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              Upcoming Services
            </button>
          </Link>
          <Link href="/faq">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              See FAQ
            </button>
          </Link>
          <Link href="/latest-news">
            <button className="p-2 border bg-white text-blue-400 font-semibold">
              Latest News
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
