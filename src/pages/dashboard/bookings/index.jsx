import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
} from "../../../redux/booking/bookingApi";
import toast from "react-hot-toast";

const BookingsPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyBookings } = useGetMyBookingsQuery(headers);
  console.log(getMyBookings?.data);
  const [
    createBooking,
    {
      isSuccess: createBookingIsSuccess,
      error: createBookingError,
      isError: createBookingIsError,
    },
  ] = useCreateBookingMutation();

  const handleBookService = (cart) => {
    const data = {
      serviceId: cart?.id,
      date: format(startDate, "MM-dd-yyyy"),
      timeSlot: timeSlot,
    };
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
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Bookings</h1>
        <div className="mt-10 flex flex-col gap-5">
          {getMyBookings?.data?.map((cart, index) => (
            <div
              key={index}
              className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
            >
              <div>
                <h4 className="text-md font-semibold">
                  {cart?.subject} {cart?.serial}
                </h4>
                <p>Type: {cart?.type}</p>
                <p>Price: ${cart?.price}</p>
                <p>Date: {cart?.date}</p>
                <p>Time Slot: {cart?.timeSlot}</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-4">
                {/* <button
                  className="btn btn-primary btn-sm"
                  onClick={() => document.getElementById(index).showModal()}
                >
                  Book Now
                </button> */}
                <dialog id={index} className="modal">
                  <div className="modal-box bg-[#1d1836]">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{cart?.type}</h3>
                      <p className="">${cart?.price}</p>
                    </div>
                    <div className="py-4">
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div className="w-full sm:w-1/2">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MM-dd-yyyy"
                            className="bg-[#1d1836] border border-primary w-full select mb-4"
                          />
                        </div>

                        <select
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="select select-primary w-full sm:w-1/2 bg-[#1d1836]"
                        >
                          <option disabled selected>
                            Select A Time Slot
                          </option>
                          <option value="10:00AM-12:00PM">
                            10:00AM - 12:00PM
                          </option>
                          <option value="12:00PM-02:00PM">
                            12:00PM - 02:00PM
                          </option>
                          <option value="02:00PM-04:00PM">
                            02:00PM - 04:00PM
                          </option>
                          <option value="04:00PM-06:00PM">
                            04:00PM - 06:00PM
                          </option>
                        </select>
                      </div>
                      <div className="text-center">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleBookService(cart)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;

BookingsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
