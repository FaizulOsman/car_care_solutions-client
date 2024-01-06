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
    console.log(data);
    createBooking({ data, headers });
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
          // background: `url(https://i.ibb.co/3S5dnds/banner.jpg)`,
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
            <button
              type="submit"
              className={`bg-gradient-to-r from-green-400 to-blue-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 text-white w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white`}
            >
              Book Now
            </button>
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
