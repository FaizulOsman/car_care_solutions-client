import React, { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useGetAllAddToCartQuery } from "../../../redux/addToCart/addToCartApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CartPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getAllAddToCart } = useGetAllAddToCartQuery(headers);

  const handleBookService = (service) => {};

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Cart</h1>
        <div className="mt-10 flex flex-col gap-5">
          {getAllAddToCart?.data?.map((cart, index) => (
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
              </div>
              <div className="flex flex-col items-center justify-between gap-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => document.getElementById(index).showModal()}
                >
                  Book Now
                </button>
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
                            className="bg-[#1d1836] border border-primary w-full select mb-4"
                          />
                        </div>

                        <select className="select select-primary w-full sm:w-1/2 bg-[#1d1836]">
                          <option disabled selected>
                            Select A Time Slot
                          </option>
                          <option>Game of Thrones</option>
                          <option>Lost</option>
                          <option>Breaking Bad</option>
                          <option>Walking Dead</option>
                        </select>
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

export default CartPage;

CartPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
