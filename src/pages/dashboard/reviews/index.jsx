import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useDeleteReviewMutation,
  useGetMyReviewsQuery,
} from "../../../redux/review/reviewApi";
import toast from "react-hot-toast";
import Table from "../../../components/UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";
import { MdDeleteOutline } from "react-icons/md";
import useProtectedRoute from "../../../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const AllReviewsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const { data: getAllReviews } = useGetMyReviewsQuery(headers);
  const [deleteReview, { isSuccess, isError, error }] =
    useDeleteReviewMutation();

  const handleDeleteReview = (id) => {
    deleteReview(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review deleted successfully");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div>
      <Table
        tableTitle={`${
          decodedToken?.role === "admin" || decodedToken?.role === "super_admin"
            ? "All"
            : "My"
        } Reviews (${
          getAllReviews?.data?.length > 0 ? getAllReviews?.data?.length : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={getAllReviews?.data}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="service" className="px-3 pt-0 pb-3">
            Service
          </th>,
          <th key="name" className="px-3 pt-0 pb-3">
            Name
          </th>,
          <th key="email" className="px-3 pt-0 pb-3">
            Email
          </th>,
          <th key="rating" className="px-3 pt-0 pb-3">
            Rating
          </th>,
          <th key="review" className="px-3 pt-0 pb-3">
            Review
          </th>,
          <th key="delete" className="px-3 pt-0 pb-3">
            Delete
          </th>,
        ]}
        tableBodyData={getAllReviews?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="px-3 py-2">
              {data?.type} -{" "}
              <span className="text-green-500">${data?.price}</span>
            </td>
            <td className="px-3 py-2">{data?.name}</td>
            <td className="px-3 py-2">{data?.email}</td>
            <td className="px-3 py-2">
              <div className="rating rating-xs">
                {Array(data?.rating)
                  .fill(data?.rating)
                  ?.map((r, i) => (
                    <input
                      key={i}
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-orange-400"
                      disabled
                    />
                  ))}
                {Array(5 - data?.rating)
                  .fill(5 - data?.rating)
                  ?.map((r, i) => (
                    <input
                      key={i}
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-gray-500"
                      disabled
                    />
                  ))}
              </div>
            </td>
            <td className="px-3 py-2">
              <div className={`flex items-center`}>
                <button
                  onClick={() =>
                    document.getElementById(data?.id + 456).showModal()
                  }
                >
                  <button
                    className={`btn btn-xs bg-green-600 hover:bg-green-800 text-white border-none`}
                  >
                    Review
                  </button>
                </button>
                <dialog id={data?.id + 456} className="modal">
                  <div className="modal-box bg-[#2a2a31]">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg text-white pb-3">
                        Feedback
                      </h3>
                      <span className="text-green-500">{data?.email}</span>
                    </div>
                    <p className="text-gray-300">{data?.review}</p>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </td>
            <td className="px-3 py-2">
              <div className="cursor-pointer text-red-600">
                <Modal
                  Button={<MdDeleteOutline className={`w-5 h-5`} />}
                  data={data}
                  modalBody={
                    <>
                      <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                        Are you sure you want to delete this item?
                      </h3>
                      <div className="py-4 text-center flex justify-around">
                        <button
                          onClick={() => {
                            handleDeleteReview(data?.id);
                            const modal = document.getElementById(data?.id);
                            if (modal) {
                              modal.close();
                            }
                          }}
                          className="btn bg-[#eb3300] hover:bg-red-700 border-none btn-xs sm:btn-sm text-white"
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
                          className="btn bg-green-600 hover:bg-green-800 text-white border-none btn-xs sm:btn-sm"
                        >
                          No
                        </button>
                      </div>
                    </>
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default AllReviewsPage;

AllReviewsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
