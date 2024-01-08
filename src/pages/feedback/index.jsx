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
      {/* <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
        <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
          Feedback
        </h2>
        <p className="mb-5 leading-relaxed text-gray-600">
          If you had any issues or you liked our services, please share with us!
        </p>
        <form onSubmit={(e) => handleFeedbackSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm leading-7 text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="text-sm leading-7 text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            ></textarea>
          </div>
          <button
            type="submit"
            className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          >
            Send
          </button>
        </form>
        <p className="mt-3 text-xs text-gray-500">
          Feel free to connect with us on social media platforms.
        </p>
      </div> */}
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
