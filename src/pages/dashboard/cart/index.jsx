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
import Table from "../../../components/UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const CartPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  const { data: getAllAddToCart } = useGetAllAddToCartQuery(headers);
  const [
    deleteAddToCart,
    { isSuccess: deleteAddToCartIsSuccess, isError: deleteAddToCartIsError },
  ] = useDeleteAddToCartMutation();
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
    deleteAddToCart(id);
  };

  useEffect(() => {
    if (createBookingIsSuccess) {
      toast.success("Service booked successfully!");
    }
    if (createBookingIsError) {
      toast.error(createBookingError?.data?.message || "Something went wrong");
    }
  }, [createBookingIsSuccess, createBookingError, createBookingIsError]);

  useEffect(() => {
    if (deleteAddToCartIsSuccess) {
      toast.success("Service removed from wishlist!");
    }
    if (deleteAddToCartIsError) {
      toast.error(
        deleteAddToCartIsError?.data?.message || "Something went wrong"
      );
    }
  }, [deleteAddToCartIsSuccess, deleteAddToCartIsError]);

  return (
    <div>
      <Table
        tableTitle={`My Wishlists (${
          getAllAddToCart?.data?.length > 0 ? getAllAddToCart?.data?.length : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={getAllAddToCart?.data}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="type" className="px-3 pt-0 pb-3">
            Type
          </th>,
          <th key="price" className="px-3 pt-0 pb-3">
            Price
          </th>,
          <th key="delete" className="px-3 pt-0 pb-3">
            Delete
          </th>,
          <th key="booking" className="px-3 pt-0 pb-3">
            Book Now
          </th>,
        ]}
        tableBodyData={getAllAddToCart?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="px-3 py-2">{data?.type}</td>
            <td className="px-3 py-2">${data?.price}</td>
            <td className="px-3 py-2">
              <div className="cursor-pointer text-red-600">
                <Modal
                  Button={<MdDeleteOutline className={`w-5 h-5`} />}
                  data={data}
                  modalBody={
                    <>
                      <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                        Are you sure you want to remove{" "}
                        <span className="text-error font-bold">
                          {data?.type}
                        </span>
                        ?
                      </h3>
                      <div className="py-4 text-center flex justify-around">
                        <button
                          onClick={() => {
                            handleDeleteCart(data?.id);
                            const modal = document.getElementById(data?.id);
                            if (modal) {
                              modal.close();
                            }
                          }}
                          className="btn btn-error btn-xs sm:btn-sm text-white"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            const modal = document.getElementById(data?.id);
                            if (modal) {
                              modal.close();
                            }
                          }}
                          className="btn btn-primary btn-xs sm:btn-sm"
                        >
                          No
                        </button>
                      </div>
                    </>
                  }
                />
              </div>
            </td>
            <td className="px-3 py-2 ">
              <button
                className="btn btn-primary btn-xs"
                onClick={() =>
                  document.getElementById(`book-${index}`).showModal()
                }
              >
                Book
              </button>
              <dialog id={`book-${index}`} className="modal">
                <div className="modal-box bg-[#1d1836]">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{data?.type}</h3>
                    <p className="">${data?.price}</p>
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
                        onClick={() => handleBookService(data)}
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
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default CartPage;

CartPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
