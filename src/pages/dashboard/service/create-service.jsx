import { useCreateServiceMutation } from "@/redux/service/serviceApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useProtectedRoute from "../../../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const CreateService = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const [
    createService,
    { data, isError, isLoading, isSuccess, error, status },
  ] = useCreateServiceMutation();
  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const handleCreateService = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      location: e.target.location.value,
      price: parseInt(e.target.price.value),
      image: e.target.image.value,
    };

    createService({ data, headers });
    e.target.image.value = "";
    e.target.title.value = "";
    e.target.price.value = 0;
    e.target.location.value = "";
    e.target.description.value = "";
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message}` || "Service Creation Failed!");
    }

    if (isSuccess) {
      toast.success("Service Created Successfully!");
    }
  }, [isLoading, isSuccess, isError, error]);

  return (
    <div className="my-5">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create A Service
        </h3>
        <form
          onSubmit={(e) => handleCreateService(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <textarea
            className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[150px] bg-[#1d1836]"
            name="description"
            placeholder="Description"
            required
          ></textarea>
          <button type="submit" className="btn btn-sm btn-primary">
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;

CreateService.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
