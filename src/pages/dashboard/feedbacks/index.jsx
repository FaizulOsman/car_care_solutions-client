// import React from "react";
// import DashboardLayout from "../../../layouts/DashboardLayout";
// import { useGetAllFeedbackQuery } from "../../../redux/feedback/feedbackApi";
// import Loader from "../../../components/UI/Loader";

// const AllFeedbackPage = () => {
//   const { data } = useGetAllFeedbackQuery();

//   return (
//     <div>
//       <div>
//         <div className="my-20 w-11/12 md:w-10/12 mx-auto">
//           <h1 className="text-3xl font-semibold text-center my-8">Feedbacks</h1>
//           {data?.data?.length > 0 ? (
//             <>
//               {data?.data?.length > 0 ? (
//                 <div className="mt-10 flex flex-col gap-5">
//                   {data?.data?.map((feedback, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
//                     >
//                       <div>
//                         <p>
//                           <strong className="text-primary">Email: </strong>{" "}
//                           {feedback?.email}
//                         </p>
//                         <p>
//                           <strong className="text-primary">Message:</strong>{" "}
//                           {feedback?.message}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <h2 className="text-2xl font-bold text-red-500 text-center py-10">
//                   No Data Found
//                 </h2>
//               )}
//             </>
//           ) : (
//             <Loader />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllFeedbackPage;

// AllFeedbackPage.getLayout = function getLayout(page) {
//   return <DashboardLayout>{page}</DashboardLayout>;
// };

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

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: allFeedback } = useGetAllFeedbackQuery({
    limit,
    page,
    sortOrder,
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
        tableTitle={`All Feedbacks (${
          allFeedback?.meta?.total > 0 ? allFeedback?.meta?.total : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
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
            <td className="px-3 py-2">{data?.message}</td>
            <td className="px-3 py-2">
              <div className="cursor-pointer text-red-600">
                <Modal
                  Button={<MdDeleteOutline className={`w-5 h-5`} />}
                  data={data}
                  modalBody={
                    <>
                      <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                        Are you sure you want to delete{" "}
                        <span className="text-error font-bold">
                          {data?.type}
                        </span>
                        ?
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
