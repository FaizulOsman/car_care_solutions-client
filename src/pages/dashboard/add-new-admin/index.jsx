import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSignUpMutation } from "../../../redux/user/userApi";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useProtectedRoute from "../../../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const AddNewAdmin = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const [signUp, { isSuccess, isError, error }] = useSignUpMutation();

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "admin",
      phone: e.target.phone.value,
    };
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data?.email)) {
      toast.error("Please enter a valid email");
    }
    if (emailPattern.test(data?.email)) {
      signUp(data);

      e.target.name.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
      e.target.phone.value = "";
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Admin created successfully!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="w-full md:w-10/12 lg:w-8/12 mx-auto rounded-lg bg-[#161921] px-5 py-5 lg:py-10">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create An Admin
        </h3>

        <form onSubmit={(e) => handleCreateAdmin(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-6 my-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered input-sm lg:input-md w-full bg-[#2a2a31]"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered input-sm lg:input-md w-full bg-[#2a2a31]"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="input input-bordered input-sm lg:input-md w-full bg-[#2a2a31]"
              required
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="input input-bordered input-sm lg:input-md w-full bg-[#2a2a31]"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-40 md:w-80 btn btn-sm lg:btn-md bg-green-600 hover:bg-green-800 text-white border-none"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdmin;

AddNewAdmin.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
