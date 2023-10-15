import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "react-datepicker/dist/react-datepicker.css";
import {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useGetMyBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/booking/bookingApi";
import toast from "react-hot-toast";
import { useAddReviewMutation } from "../../../redux/service/serviceApi";
import { useCreateReviewMutation } from "../../../redux/review/reviewApi";
import { useGetMyProfileQuery } from "../../../redux/user/userApi";

const jwt = require("jsonwebtoken");

const BookingsPage = () => {
  const [rating, setRating] = useState(5);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const { data: myProfile } = useGetMyProfileQuery({ headers });
  const { data: getMyBookings } = useGetMyBookingsQuery(headers);
  const [updateBooking, { isSuccess: updateBookingIsSuccess }] =
    useUpdateBookingMutation();
  const [deleteBooking, { isSuccess, isError, error }] =
    useDeleteBookingMutation();
  const [
    createReview,
    {
      isSuccess: createReviewIsSuccess,
      isError: createReviewIsError,
      error: createReviewError,
    },
  ] = useCreateReviewMutation();
  const [addReview] = useAddReviewMutation();

  const handleReviewSubmit = ({ e, cart }) => {
    e.preventDefault();
    const data = {
      serviceId: cart?.id,
      type: cart?.type,
      price: cart?.price,
      name: myProfile?.data?.name,
      email: decodedToken?.email,
      rating: rating,
      review: e.target.review.value,
    };
    const addReviewData = {
      reviews: [
        {
          name: myProfile?.data?.name,
          email: decodedToken?.email,
          rating: rating,
          review: e.target.review.value,
        },
      ],
    };
    createReview({ data, headers });
    addReview({ id: cart?.serviceId, data: addReviewData });
  };

  const handleCancelBooking = (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (isConfirm) {
      deleteBooking({ id });
    }
  };

  const handleUpdateBookingStatus = (value, booking) => {
    let data = {};
    if (value) {
      data = {
        isAccepted: true,
        isRejected: false,
      };
    } else {
      data = {
        isAccepted: false,
        isRejected: true,
      };
    }
    updateBooking({ id: booking?.id, data });
  };

  useEffect(() => {
    if (createReviewIsSuccess) {
      toast.success("Review added successfully");
    }
  }, [createReviewIsSuccess]);
  useEffect(() => {
    if (createReviewIsError) {
      toast.success(
        createReviewError?.data?.message || "Review added successfully"
      );
    }
  }, [createReviewIsError, createReviewError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review canceled successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.success(error?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  useEffect(() => {
    if (updateBookingIsSuccess) {
      toast.success("Booking status updated successfully");
    }
  }, [updateBookingIsSuccess]);

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Bookings</h1>
        {getMyBookings?.data?.length > 0 ? (
          <div className="mt-10 flex flex-col gap-5">
            {getMyBookings?.data?.map((booking, index) => (
              <div
                key={index}
                className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
              >
                <div>
                  <h4 className="text-md font-semibold">
                    {booking?.subject} {booking?.serial}
                  </h4>
                  {(booking?.isAccepted || booking?.isRejected) && (
                    <button
                      className={`btn ${
                        booking?.isAccepted ? "btn-primary" : "btn-error"
                      } btn-outline btn-xs mb-2`}
                    >
                      {booking?.isAccepted && "Accepted"}
                      {booking?.isRejected && "Rejected"}
                    </button>
                  )}
                  <p>Type: {booking?.type}</p>
                  <p>Price: ${booking?.price}</p>
                  <p>Email: {booking?.email}</p>
                  <p>Date: {booking?.date}</p>
                  <p>Time Slot: {booking?.timeSlot}</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                  <>
                    <button
                      className="btn btn-error text-white btn-xs"
                      onClick={() => handleCancelBooking(booking?.id)}
                    >
                      Cancel Booking
                    </button>
                    {decodedToken?.email === booking?.email && (
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() =>
                          document.getElementById(index).showModal()
                        }
                      >
                        Place a Review
                      </button>
                    )}
                  </>
                  {(decodedToken?.role === "admin" ||
                    decodedToken?.role === "super_admin") && (
                    <>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() =>
                          document.getElementById(`${index}-review`).showModal()
                        }
                      >
                        Update Status
                      </button>
                      <dialog id={`${index}-review`} className="modal">
                        <div className="modal-box bg-[#1d1836]">
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">
                              {booking?.type}
                            </h3>
                            <p className="">${booking?.price}</p>
                          </div>
                          <div className="py-4">
                            <h4 className="text-center">
                              Do you want to accept this booking?
                            </h4>
                            <div className="flex w-1/2 justify-between mx-auto mt-10">
                              <button
                                onClick={() =>
                                  handleUpdateBookingStatus(true, booking)
                                }
                                className="btn btn-sm btn-primary"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateBookingStatus(false, booking)
                                }
                                className="btn btn-sm btn-error text-white"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </>
                  )}

                  <dialog id={index} className="modal">
                    <div className="modal-box bg-[#1d1836]">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{booking?.type}</h3>
                        <p className="">${booking?.price}</p>
                      </div>
                      <div className="py-4">
                        <div className="flex items-center gap-4">
                          <span>Rating:</span>
                          <div className="rating rating-xs">
                            <input
                              type="radio"
                              name="rating-5"
                              className="mask mask-star-2 bg-orange-400"
                              onClick={() => setRating(1)}
                            />
                            <input
                              type="radio"
                              name="rating-5"
                              className="mask mask-star-2 bg-orange-400"
                              onClick={() => setRating(2)}
                            />
                            <input
                              type="radio"
                              name="rating-5"
                              className="mask mask-star-2 bg-orange-400"
                              onClick={() => setRating(3)}
                            />
                            <input
                              type="radio"
                              name="rating-5"
                              className="mask mask-star-2 bg-orange-400"
                              onClick={() => setRating(4)}
                            />
                            <input
                              type="radio"
                              name="rating-5"
                              className="mask mask-star-2 bg-orange-400"
                              onClick={() => setRating(5)}
                            />
                          </div>
                        </div>
                        <form
                          onSubmit={(e) =>
                            handleReviewSubmit({ e, cart: booking })
                          }
                        >
                          <textarea
                            className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[100px] bg-[#1d1836] my-4"
                            name="review"
                            placeholder="Review"
                            required
                          ></textarea>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
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

export default BookingsPage;

BookingsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
