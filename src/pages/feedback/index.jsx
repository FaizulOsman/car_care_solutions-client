import React, { useEffect } from "react";
import RootLayout from "../../layouts/RootLayout";
import { useCreateFeedbackMutation } from "../../redux/feedback/feedbackApi";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineSelect } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";

const jwt = require("jsonwebtoken");

const FeedbackPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };
  const [createFeedback, { isSuccess, isError, error }] =
    useCreateFeedbackMutation();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!decodedToken?.email) {
      toast.error("Please login to give feedback!");
    } else {
      const data = {
        email: decodedToken?.email || e.target.email.value,
        message: e.target.message.value,
      };
      createFeedback({ data, headers });
      e.target.name.value = "";
      e.target.message.value = "";
      e.target.email.value = "";
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Feedback successfully sent!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isError, error]);

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto pb-10">
      <div className="w-full bg-[#f3f3f3] px-6 sm:px-10 py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-7 text-center">
          Send A Feedback
        </h2>
        <form
          onSubmit={(e) => handleFeedbackSubmit(e)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full">
              <input
                type="text"
                name="name"
                className="w-full pl-10 pr-2 py-[12px] sm:py-[14px] border hover:border-red-500 focus:outline-none focus:shadow-outline"
                placeholder="Name"
                required
              />
              <HiOutlineUser className="absolute left-4 top-[13px] sm:top-[16px] text-red-500 w-5 h-6" />
            </div>
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-2 py-[12px] sm:py-[14px] border hover:border-red-500 focus:outline-none focus:shadow-outline"
                placeholder="Email Address"
                required
              />
              <MdOutlineEmail className="absolute left-4 top-[13px] sm:top-[16px] text-red-500 w-5 h-6" />
            </div>
          </div>
          <div className="relative w-full">
            <textarea
              className="w-full h-40 pl-10 pr-2 py-[12px] sm:py-[14px] border hover:border-red-500 focus:outline-none focus:shadow-outline"
              placeholder="Message"
              name="message"
              required
            ></textarea>
            <BiMessageRounded className="absolute left-4 top-[13px] sm:top-[16px] text-red-500 w-5 h-6" />
          </div>
          <button
            type="submit"
            className="w-40 mx-auto flex justify-center items-center gap-2 hover:gap-4 text-white bg-[#EB3300] hover:bg-[#d13509] duration-200 text-center py-[12px] sm:py-[14px] rounded-md"
          >
            <span>Submit Now</span> <FaArrowRightLong />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;

FeedbackPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
