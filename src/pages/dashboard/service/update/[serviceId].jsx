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
      type: e.target.type.value,
      description: e.target.description.value,
      location: e.target.location.value,
      price: parseInt(e.target.price.value),
      status: e.target.status.value,
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
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 rounded-lg bg-[#161921] p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Update Service
        </h3>
        <form
          onSubmit={(e) => handleUpdateService(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <select
            name="status"
            className="select select-sm w-full bg-[#2a2a31]"
          >
            <option
              value="ongoing"
              selected={getSingleService?.data?.status === "ongoing" && true}
            >
              Ongoing
            </option>
            <option
              value="upcoming"
              selected={getSingleService?.data?.status === "upcoming" && true}
            >
              Upcoming
            </option>
          </select>
          <input
            type="text"
            name="type"
            placeholder="Type"
            className="input input-sm w-full bg-[#2a2a31]"
            defaultValue={getSingleService?.data?.type}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-sm w-full bg-[#2a2a31]"
            defaultValue={getSingleService?.data?.price}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-sm w-full bg-[#2a2a31]"
            defaultValue={getSingleService?.data?.location}
            required
          />
          <textarea
            className="textarea first-letter:input input-sm w-full h-[150px] bg-[#2a2a31]"
            name="description"
            placeholder="Description"
            defaultValue={getSingleService?.data?.description}
            required
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-80 btn btn-sm bg-green-600 hover:bg-green-800 text-white border-none"
            >
              Update Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;

UpdateService.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
