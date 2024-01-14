import React, { useEffect } from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useCreateFaqMutation } from "../../../../redux/faq/faqApi";
import toast from "react-hot-toast";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const CreateFaq = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const [createFaq, { isSuccess, isError, error }] = useCreateFaqMutation();

  const handleCreateFaq = (e) => {
    e.preventDefault();
    const data = {
      question: e.target.question.value,
      answer: e.target.answer.value,
    };
    createFaq({ data, headers });

    e.target.question.value = "";
    e.target.answer.value = "";
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="w-full md:w-10/12 lg:w-8/12 mx-auto rounded-lg bg-[#161921] p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create FAQ
        </h3>

        <form
          onSubmit={(e) => handleCreateFaq(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <input
            type="text"
            name="question"
            placeholder="Question"
            className="input input-sm w-full bg-[#2a2a31]"
            required
          />
          <textarea
            className="textarea first-letter:input input-sm w-full h-[150px] bg-[#2a2a31]"
            name="answer"
            placeholder="Answer"
            required
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-80 btn btn-sm bg-green-600 hover:bg-green-800 text-white border-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFaq;

CreateFaq.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
