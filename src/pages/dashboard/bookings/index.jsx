import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "react-datepicker/dist/react-datepicker.css";
import {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
} from "../../../redux/booking/bookingApi";
import toast from "react-hot-toast";
import { useAddReviewMutation } from "../../../redux/service/serviceApi";
import { useCreateReviewMutation } from "../../../redux/review/reviewApi";
import { useGetMyProfileQuery } from "../../../redux/user/userApi";

const jwt = require("jsonwebtoken");

const BookingsPage = () => {
  const [rating, setRating] = useState(5);
  console.log(rating);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const { data: myProfile } = useGetMyProfileQuery({ headers });
  const { data: getMyBookings } = useGetMyBookingsQuery(headers);
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

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Bookings</h1>
        {getMyBookings?.data?.length > 0 ? (
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
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => document.getElementById(index).showModal()}
                  >
                    Place a Review
                  </button>
                  <dialog id={index} className="modal">
                    <div className="modal-box bg-[#1d1836]">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{cart?.type}</h3>
                        <p className="">${cart?.price}</p>
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
                        <form onSubmit={(e) => handleReviewSubmit({ e, cart })}>
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
