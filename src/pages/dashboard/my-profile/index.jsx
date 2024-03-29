import Image from "next/image";
import Modal from "../../../components/UI/Modal/Modal";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../redux/user/userApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import ImageUpload from "../../../components/UI/ImageUpload";
import PlaceholderLoader from "../../../components/UI/Loader/PlaceholderLoader";

const jwt = require("jsonwebtoken");

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const [
    updateMyProfile,
    {
      isSuccess: updateProfileIsSuccess,
      isError: updateProfileIsError,
      error: updateProfileError,
    },
  ] = useUpdateMyProfileMutation();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;

    const data = { email, phone, address };
    updateMyProfile({ data, headers });
  };

  const handleUploadImage = async (imageUrl) => {
    const data = { imageUrl: imageUrl };
    await updateMyProfile({ data, headers });

    const modal = document.getElementById(myProfile?.id);
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    if (updateProfileIsSuccess) {
      toast.success("Profile updated successfully");
    }
    if (updateProfileIsError) {
      toast.error(updateProfileError.message || "Something went wrong");
    }
  }, [updateProfileIsSuccess, updateProfileIsError, updateProfileError]);

  useEffect(() => {
    setMyProfile(getMyProfile?.data);
  }, [getMyProfile?.data]);

  return (
    <div className="w-full md:w-10/12 lg:w-8/12 mx-auto rounded-md bg-[#161921] p-5">
      <h2 className={`text-3xl font-semibold pb-10 text-white text-center`}>
        My Profile
      </h2>
      {myProfile ? (
        <>
          <div className="text-center mx-auto">
            <Modal
              Button={
                <div className="relative text-center">
                  <Image
                    src={
                      myProfile?.imageUrl
                        ? myProfile?.imageUrl
                        : "https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                    }
                    className="w-16 h-16 mx-auto border-gray-800 rounded-full mb-10"
                    width="150"
                    height="150"
                    alt="Profile Image"
                  />
                  <div>
                    <p
                      className="absolute bottom-0 left-0 w-full flex justify-center items-center h-1/2 hover:bg-gray-400 hover:bg-opacity-50 hover:text-blue-700"
                      style={{ borderRadius: "0 0 30px 30px" }}
                    >
                      <FaRegEdit />
                    </p>
                  </div>
                </div>
              }
              styles="justify-center"
              data={myProfile}
              modalBody={
                <div className="relative">
                  <RxCross2
                    onClick={() => {
                      const modal = document.getElementById(myProfile?.id);
                      if (modal) {
                        modal.close();
                      }
                    }}
                    className="text-lg absolute -top-3 -right-2 cursor-pointer"
                  />
                  <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                    Upload you new profile image.
                  </h3>
                  <ImageUpload handleUploadImage={handleUploadImage} />
                </div>
              }
            />
          </div>
          <div>
            <form onSubmit={(e) => handleUpdateProfile(e)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-8 mt-4">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-sm lg:input-md w-full py-3 px-4 rounded-md focus:outline-none focus:border-blue-500 bg-[#2a2a31]"
                    autoComplete="off"
                    defaultValue={myProfile?.name}
                    disabled={true}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm left-6 -top-3 bg-[#2a2a31] rounded-md px-2 text-gray-400 transition-all duration-300"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="input-sm lg:input-md w-full py-3 px-4 rounded-md focus:outline-none focus:border-blue-500 bg-[#2a2a31]"
                    autoComplete="off"
                    defaultValue={myProfile?.email}
                    disabled={true}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm left-6 -top-3 bg-[#2a2a31] rounded-md px-2 text-gray-400 transition-all duration-300"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="input-sm lg:input-md w-full py-3 px-4 rounded-md focus:outline-none focus:border-blue-500 bg-[#2a2a31]"
                    autoComplete="off"
                    defaultValue={myProfile?.phone}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm left-6 -top-3 bg-[#2a2a31] rounded-md px-2 text-gray-400 transition-all duration-300"
                  >
                    Phone
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="input-sm lg:input-md w-full py-3 px-4 rounded-md focus:outline-none focus:border-blue-500 bg-[#2a2a31]"
                    autoComplete="off"
                    defaultValue={myProfile?.address}
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-sm left-6 -top-3 bg-[#2a2a31] rounded-md px-2 text-gray-400 transition-all duration-300"
                  >
                    address
                  </label>
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="w-full md:w-80 btn btn-sm lg:btn-md bg-green-600 hover:bg-green-800 text-white border-none"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <PlaceholderLoader />
      )}
    </div>
  );
};

export default MyProfile;

MyProfile.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
