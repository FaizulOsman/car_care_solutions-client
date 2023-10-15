import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useDeleteAddToCartMutation,
  useGetAllAddToCartQuery,
} from "../../../redux/addToCart/addToCartApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useCreateBookingMutation } from "../../../redux/booking/bookingApi";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

const jwt = require("jsonwebtoken");

const CartPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  const { data: getAllAddToCart } = useGetAllAddToCartQuery(headers);
  const [deleteAddToCart] = useDeleteAddToCartMutation();
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
      type: cart?.type,
      price: cart?.price,
      email: decodedToken?.email,
      date: format(startDate, "MM-dd-yyyy"),
      timeSlot: timeSlot,
      isAccepted: false,
      isRejected: false,
    };
    createBooking({ data, headers });
  };

  const handleDeleteCart = (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (isConfirm) {
      deleteAddToCart(id);
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
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Cart</h1>
        {getAllAddToCart?.data?.length > 0 ? (
          <div className="mt-10 flex flex-col gap-5">
            {getAllAddToCart?.data?.map((cart, index) => (
              <div
                key={index}
                className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
              >
                <div>
                  <p>Type: {cart?.type}</p>
                  <p>Price: ${cart?.price}</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => handleDeleteCart(cart?.id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => document.getElementById(index).showModal()}
                    >
                      Book Now
                    </button>
                  </div>
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
        ) : (
          <h2 className="text-2xl font-bold text-red-500 text-center py-10">
            No Data Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default CartPage;

CartPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
