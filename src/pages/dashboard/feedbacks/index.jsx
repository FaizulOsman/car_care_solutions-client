import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useGetAllFeedbackQuery } from "../../../redux/feedback/feedbackApi";

const AllFeedbackPage = () => {
  const { data } = useGetAllFeedbackQuery();

  return (
    <div>
      <div>
        <div className="my-20 w-11/12 md:w-10/12 mx-auto">
          <h1 className="text-3xl font-semibold text-center my-8">Feedbacks</h1>
          {data?.data?.length > 0 ? (
            <div className="mt-10 flex flex-col gap-5">
              {data?.data?.map((feedback, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
                >
                  <div>
                    <p>
                      <strong className="text-primary">Email: </strong>{" "}
                      {feedback?.email}
                    </p>
                    <p>
                      <strong className="text-primary">Message:</strong>{" "}
                      {feedback?.message}
                    </p>
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
    </div>
  );
};

export default AllFeedbackPage;

AllFeedbackPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
