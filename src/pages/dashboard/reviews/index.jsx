import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useGetAllReviewQuery } from "../../../redux/review/reviewApi";

const AllReviewsPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data } = useGetAllReviewQuery(headers);

  return (
    <div>
      <div>
        <div className="my-20 w-11/12 md:w-10/12 mx-auto">
          <h1 className="text-3xl font-semibold text-center my-8">Reviews</h1>
          {data?.data?.length > 0 ? (
            <div className="mt-10 flex flex-col gap-5">
              {data?.data?.map((review, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 items-center  bg-[#1d1836] p-2 rounded-md"
                >
                  <p>
                    <strong className="text-primary">Service:</strong>{" "}
                    {review?.type} - ${review?.price}
                  </p>
                  <p>
                    <strong className="text-primary">Name:</strong>{" "}
                    {review?.name}
                  </p>
                  <p>
                    <strong className="text-primary">Email: </strong>{" "}
                    {review?.email}
                  </p>
                  <p>
                    <strong className="text-primary">Rating:</strong>{" "}
                    {review?.rating}
                  </p>
                  <p>
                    <strong className="text-primary">Review:</strong>{" "}
                    {review?.review}
                  </p>
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

export default AllReviewsPage;

AllReviewsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
