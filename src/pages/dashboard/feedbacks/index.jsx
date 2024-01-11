import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useDeleteFeedbackMutation,
  useGetAllFeedbackQuery,
} from "../../../redux/feedback/feedbackApi";
import Modal from "../../../components/UI/Modal/Modal";
import { MdDeleteOutline } from "react-icons/md";
import Table from "../../../components/UI/Table/Table";
import toast from "react-hot-toast";

const AllFeedbackPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const jwt = require("jsonwebtoken");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const { data: allFeedback } = useGetAllFeedbackQuery({
    limit,
    page,
    sortOrder,
    headers,
  });

  const [deleteFeedback, { isError, isSuccess, error }] =
    useDeleteFeedbackMutation();

  const handleDeleteFeedback = (feedback) => {
    deleteFeedback({ id: feedback?.id, headers });
  };

  useEffect(() => {
    setMeta(allFeedback?.meta);
    setLimit(allFeedback?.meta?.limit);
  }, [allFeedback?.meta]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Feedback deleted successfully!");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error]);

  return (
    <div>
      <Table
        tableTitle={`${
          decodedToken?.role === "admin" || decodedToken?.role === "super_admin"
            ? "All"
            : "My"
        } Feedbacks (${
          decodedToken?.role === "admin" || decodedToken?.role === "super_admin"
            ? allFeedback?.meta?.total > 0
              ? allFeedback?.meta?.total
              : 0
            : allFeedback?.data?.length > 0
            ? allFeedback?.data?.length
            : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={
          decodedToken?.role === "admin" ||
          (decodedToken?.role === "super_admin" && meta)
        }
        allData={allFeedback?.data}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="email" className="px-3 pt-0 pb-3">
            Email
          </th>,
          <th key="message" className="px-3 pt-0 pb-3">
            Message
          </th>,
          <th key="delete" className="px-3 pt-0 pb-3">
            Delete
          </th>,
        ]}
        tableBodyData={allFeedback?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="px-3 py-2">{data?.email}</td>
            <td className="px-3 py-2">
              <div className={`flex items-center`}>
                <button
                  onClick={() =>
                    document.getElementById(data?.id + 123).showModal()
                  }
                >
                  <button className={`btn btn-xs btn-primary`}>Feedback</button>
                </button>
                <dialog id={data?.id + 123} className="modal">
                  <div className="modal-box bg-[#1d1836]">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg text-white pb-3">
                        Feedback
                      </h3>
                      <span className="text-green-500">{data?.email}</span>
                    </div>
                    <p className="text-gray-300">{data?.message}</p>
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
                            handleDeleteFeedback(data);
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
          </tr>
        ))}
      />
    </div>
  );
};

export default AllFeedbackPage;

AllFeedbackPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
