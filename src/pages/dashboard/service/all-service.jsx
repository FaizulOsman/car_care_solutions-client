import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "../../../redux/service/serviceApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Table from "../../../components/UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";
import toast from "react-hot-toast";

const jwt = require("jsonwebtoken");

const AllServices = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: allService } = useGetAllServiceQuery({
    searchValue: "",
    status: "",
    limit,
    page,
    sortOrder,
  });

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const [deleteService, { isError, isSuccess, error }] =
    useDeleteServiceMutation();

  const handleDeleteService = (service) => {
    deleteService({ id: service?.id, headers });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Service deleted successfully!");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error]);

  useEffect(() => {
    setMeta(allService?.meta);
    setLimit(allService?.meta?.limit);
  }, [allService?.meta]);

  return (
    <div>
      <Table
        tableTitle={`All Services (${
          allService?.meta?.total > 0 ? allService?.meta?.total : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={allService?.data}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="type" className="px-3 pt-0 pb-3">
            Service Type
          </th>,
          <th key="price" className="px-3 pt-0 pb-3">
            Price
          </th>,
          <th key="delete" className="px-3 pt-0 pb-3">
            Delete
          </th>,
          <th key="update" className="px-3 pt-0 pb-3">
            Update
          </th>,
        ]}
        tableBodyData={allService?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="px-3 py-2">{data?.type}</td>
            <td className="px-3 py-2">${data?.price}</td>
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
                            handleDeleteService(data);
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
            <td className="px-3 py-2 ">
              <Link href={`/dashboard/service/update/${data?.id}`}>
                <button className="text-lg border-none text-green-600 hover:text-green-500">
                  <FaRegEdit className="w-4 h-4" />
                </button>
              </Link>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default AllServices;

AllServices.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
