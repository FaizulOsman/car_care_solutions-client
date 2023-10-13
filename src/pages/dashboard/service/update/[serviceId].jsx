import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../../../redux/service/serviceApi";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import { useRouter } from "next/router";

const jwt = require("jsonwebtoken");

const UpdateService = () => {
  const { query } = useRouter();
  const id = query.serviceId;

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  const { data: getSingleService } = useGetSingleServiceQuery(id);

  const [
    updateService,
    { data, isError, isLoading, isSuccess, error, status },
  ] = useUpdateServiceMutation();

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const handleUpdateService = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      location: e.target.location.value,
      price: parseInt(e.target.price.value),
      image: e.target.image.value,
    };

    updateService({ id, data, headers });
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message}` || "Service Creation Failed!");
    }

    if (isSuccess) {
      toast.success("Service Updated Successfully!");
    }
  }, [isLoading, isSuccess, isError, error]);

  return (
    <div className="my-5">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Update Service
        </h3>
        <form
          onSubmit={(e) => handleUpdateService(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            defaultValue={getSingleService?.data?.image}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            defaultValue={getSingleService?.data?.title}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            defaultValue={getSingleService?.data?.price}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            defaultValue={getSingleService?.data?.location}
            required
          />
          <textarea
            className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[150px] bg-[#1d1836]"
            name="description"
            placeholder="Description"
            defaultValue={getSingleService?.data?.description}
            required
          ></textarea>
          <button type="submit" className="btn btn-sm btn-primary">
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;

UpdateService.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
