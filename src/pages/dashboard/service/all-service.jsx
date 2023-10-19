import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "../../../redux/service/serviceApi";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Loader from "../../../components/UI/Loader";

const jwt = require("jsonwebtoken");

const AllServices = () => {
  const { data: allService } = useGetAllServiceQuery();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const [deleteService, { isError, isLoading, isSuccess, error }] =
    useDeleteServiceMutation();

  const handleDeleteService = (service) => {
    const isConfirm = window.confirm(`Do you want to delete: ${service?.type}`);
    if (isConfirm) {
      deleteService({ id: service?.id, headers });
    }
  };

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center my-8">
          Services
        </h1>
        {allService?.data?.length > 0 ? (
          <>
            {allService?.data?.length > 0 ? (
              <div className="mt-10 flex flex-col gap-5">
                {allService?.data?.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
                  >
                    <div>
                      <h4 className="text-md font-semibold">
                        {service?.subject} {service?.serial}
                      </h4>
                      <p>Type: {service?.type}</p>
                      <p>Price: ${service?.price}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4">
                      <Link href={`/dashboard/service/update/${service?.id}`}>
                        <button className="text-lg border-none text-primary hover:text-blue-600">
                          <FaRegEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="text-2xl border-none  text-red-500 hover:text-red-600"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-2xl font-bold text-red-500 text-center py-10">
                No Data Found
              </h2>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AllServices;

AllServices.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
