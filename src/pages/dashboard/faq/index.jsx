import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../../redux/faq/faqApi";
import toast from "react-hot-toast";
import Loader from "../../../components/UI/Loader";
import Table from "../../../components/UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";

const AllFaq = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: allFaq } = useGetAllFaqQuery();
  const [deleteFaq, { isSuccess, isError, error }] = useDeleteFaqMutation();

  const handleDeleteFaq = (faq) => {
    deleteFaq({ id: faq?.id });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Deleted");
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
        tableTitle={`All FAQ (${
          allFaq?.data?.length > 0 ? allFaq?.data?.length : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={allFaq?.data}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="question" className="px-3 pt-0 pb-3">
            Question
          </th>,
          <th key="answer" className="px-3 pt-0 pb-3">
            Answer
          </th>,
          <th key="delete" className="px-3 pt-0 pb-3">
            Delete
          </th>,
        ]}
        tableBodyData={allFaq?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="px-3 py-2">
              {data?.question?.length > 40
                ? `${data?.question?.slice(0, 40)}...`
                : data?.question}
            </td>
            <td className="px-3 py-2">
              <div className={`flex items-center`}>
                <button
                  onClick={() =>
                    document.getElementById(data?.id + 789).showModal()
                  }
                >
                  <button
                    className={`btn btn-xs bg-green-600 hover:bg-green-800 border-none text-white`}
                  >
                    Answer
                  </button>
                </button>
                <dialog id={data?.id + 789} className="modal">
                  <div className="modal-box bg-[#2a2a31]">
                    <h3 className="font-semibold text-lg text-white pb-3">
                      {data?.question}
                    </h3>
                    <p className="text-gray-300">{data?.answer}</p>
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
                        Are you sure you want to delete{" "}
                        <span className="text-error font-bold">
                          {data?.question}
                        </span>
                        ?
                      </h3>
                      <div className="py-4 text-center flex justify-around">
                        <button
                          onClick={() => {
                            handleDeleteFaq(data);
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
                          className="btn bg-green-600 hover:bg-green-800 border-none text-white btn-xs sm:btn-sm"
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

export default AllFaq;

AllFaq.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
