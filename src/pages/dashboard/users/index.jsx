import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useDeleteUserMutation,
  useGetAllUsersByQueryQuery,
  useGetMyProfileQuery,
  useUpdateUserMutation,
} from "../../../redux/user/userApi";
import Link from "next/link";
import Table from "../../../components/UI/Table/Table";
import Modal from "../../../components/UI/Modal/Modal";
import Image from "next/image";

const jwt = require("jsonwebtoken");

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const { data: getAllUsers } = useGetAllUsersByQueryQuery({
    headers,
    limit,
    page,
    sortOrder,
  });
  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const [
    deleteUser,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteErrMessage,
    },
  ] = useDeleteUserMutation();

  const handleDeleteUser = (user) => {
    deleteUser({ id: user?.id, headers });
  };

  const handleSetRole = ({ user, e }) => {
    if (e.target.checked) {
      const data = { role: "admin" };
      updateUser({ id: user?.id, data, headers });
    } else {
      const data = { role: "user" };
      updateUser({ id: user?.id, data, headers });
    }
  };

  useEffect(() => {
    if (isUpdateUserSuccess) {
      toast.success("Successfully Updated User!");
      setAllUsers(getAllUsers?.data);
    }
    if (isUpdateUserError) {
      toast.error(updateUserError?.message || "Something went wrong");
    }
  }, [
    getAllUsers,
    getAllUsers?.data,
    isUpdateUserSuccess,
    isUpdateUserError,
    updateUserError,
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Successfully deleted user!");
      setAllUsers(getAllUsers?.data);
    }
    if (isDeleteError) {
      toast.error(deleteErrMessage?.message || "Something went wrong");
    }
  }, [
    getAllUsers,
    getAllUsers?.data,
    isDeleteSuccess,
    isDeleteError,
    deleteErrMessage,
  ]);

  useEffect(() => {
    setAllUsers(getAllUsers?.data);
    setMeta(getAllUsers?.meta);
  }, [getAllUsers, getAllUsers?.data, getAllUsers?.meta]);

  return (
    <div>
      <Table
        tableTitle={`All Users (${
          getAllUsers?.meta?.total ? getAllUsers?.meta?.total : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={allUsers}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="image" className="px-3 pt-0 pb-3">
            Image
          </th>,
          <th key="name" className="px-3 pt-0 pb-3">
            Name
          </th>,
          <th key="email" className="px-3 pt-0 pb-3">
            Email
          </th>,
          <th key="isAdmin" className="px-3 pt-0 pb-3">
            Admin
          </th>,
          <th key="delete" className="px-3 pt-0 pb-3">
            Delete
          </th>,
          <th key="update" className="px-3 pt-0 pb-3">
            Update
          </th>,
        ]}
        tableBodyData={allUsers?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="px-3 py-2">
              {data?.imageUrl ? (
                <Image
                  src={data?.imageUrl}
                  alt="profile"
                  className="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
                  width={50}
                  height={50}
                />
              ) : (
                <img
                  src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${
                    index + 1
                  }).jpg`}
                  alt="profile"
                  className="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
                  width={50}
                  height={50}
                />
              )}
            </td>
            <td className="px-3 py-2">{data.name}</td>
            <td className="px-3 py-2">{data.email}</td>
            <td className="px-3 py-2">
              <input
                type="checkbox"
                className="toggle toggle-xs sm:toggle-sm toggle-primary"
                defaultChecked={
                  data?.role === "admin" || data?.role === "super_admin"
                    ? true
                    : false
                }
                onClick={(e) => handleSetRole({ user: data, e })}
                disabled={
                  (data?.email === getMyProfile?.data?.email ? true : false) ||
                  (data?.role === "super_admin" ? true : false)
                }
              />
            </td>
            <td className="px-3 py-2">
              <div
                disabled={
                  (data?.email === getMyProfile?.data?.email ? true : false) ||
                  (data?.role === "super_admin" ? true : false)
                }
                className={`${
                  data?.email === getMyProfile?.data?.email ||
                  data?.role === "super_admin"
                    ? "cursor-not-allowed text-red-400"
                    : "cursor-pointer text-red-600"
                }`}
              >
                <Modal
                  isDisabled={data?.role === "super_admin" ? true : false}
                  Button={
                    <MdDeleteOutline
                      className={`w-5 h-5 ${
                        data?.role === "super_admin" && "cursor-not-allowed"
                      }`}
                    />
                  }
                  data={data}
                  modalBody={
                    <>
                      <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                        Are you sure you want to delete{" "}
                        <span className="text-error font-bold">
                          {data?.email}
                        </span>
                        ?
                      </h3>
                      <div className="py-4 text-center flex justify-around">
                        <button
                          onClick={() => {
                            handleDeleteUser(data);
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
              <Link
                href={
                  data?.email === getMyProfile?.data?.email ||
                  data?.role === "super_admin"
                    ? ""
                    : `/dashboard/users/update/${data?.id}`
                }
                disabled={
                  (data?.email === getMyProfile?.data?.email ? true : false) ||
                  (data?.role === "super_admin" ? true : false)
                }
                className={`${
                  data?.email === getMyProfile?.data?.email ||
                  data?.role === "super_admin"
                    ? "cursor-not-allowed text-green-400"
                    : "cursor-pointer text-green-600 hover:text-green-500"
                }`}
              >
                <FaRegEdit className="w-4 h-4" />
              </Link>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
