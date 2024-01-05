import { useCreateServiceMutation } from "../../../redux/service/serviceApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useProtectedRoute from "../../../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const CreateService = () => {
  const [serviceData, setServiceData] = useState({});
  const [facilities, setFacilities] = useState([]);
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

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const handleAddFacilities = (e) => {
    e.preventDefault();
    const facility = e.target.facility.value;
    setFacilities([...facilities, facility]);
    setServiceData({ ...serviceData, facilities: [...facilities, facility] });
    e.target.facility.value = "";
  };

  const handleAddServiceData = (e) => {
    e.preventDefault();
    const data = {
      type: e.target.type.value,
      status: e.target.status.value,
      description: e.target.description.value,
      location: e.target.location.value,
      price: parseInt(e.target.price.value),
    };
    setServiceData({
      ...serviceData,
      type: e.target.type.value,
      status: e.target.status.value,
      description: e.target.description.value,
      location: e.target.location.value,
      price: parseInt(e.target.price.value),
    });

    e.target.type.value = "";
    e.target.price.value = 0;
    e.target.location.value = "";
    e.target.description.value = "";
  };

  const handleCreateService = () => {
    createService({ data: serviceData, headers });
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
          Service Data
        </h3>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {serviceData?.type && (
              <li className="list-disc">
                <strong className="text-blue-500">Type: </strong>
                {serviceData?.type}
              </li>
            )}
            {serviceData?.status && (
              <li className="list-disc">
                <strong className="text-blue-500">Status: </strong>
                {serviceData?.status}
              </li>
            )}
            {serviceData?.price && (
              <li className="list-disc">
                <strong className="text-blue-500">Price: </strong>
                {serviceData?.price}
              </li>
            )}
            {serviceData?.location && (
              <li className="list-disc">
                <strong className="text-blue-500">Location: </strong>
                {serviceData?.location}
              </li>
            )}
          </div>
          {serviceData?.description && (
            <li className="list-disc">
              <strong className="text-blue-500">Description: </strong>
              {serviceData?.description}
            </li>
          )}
        </div>
        <form
          onSubmit={(e) => handleAddServiceData(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <input
              type="text"
              name="type"
              placeholder="Type"
              className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
              required
            />
            <select
              name="status"
              className="select select-sm select-primary w-full bg-[#1d1836]"
            >
              <option value="ongoing" selected>
                Ongoing
              </option>
              <option value="upcoming">Upcoming</option>
            </select>
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
          </div>
          <textarea
            className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[150px] bg-[#1d1836]"
            name="description"
            placeholder="Description"
            required
          ></textarea>
          <button type="submit" className="btn btn-sm btn-primary">
            Add Service Data
          </button>
        </form>
      </div>
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Add facilities
        </h3>
        <div>
          {facilities?.map((facility, index) => (
            <li className="list-disc" key={index}>
              {facility}
            </li>
          ))}
        </div>
        <form
          onSubmit={(e) => handleAddFacilities(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <select
            name="facility"
            className="select select-sm select-primary w-full bg-[#1d1836]"
            required
          >
            <option value="" selected>
              Select one
            </option>
            <option value="Exterior Hand Wash">Exterior Hand Wash</option>
            <option value="Rims + Tire Shine">Rims + Tire Shine</option>
            <option value="Full Vacuum">Full Vacuum</option>
            <option value="Shampoo Seats">Shampoo Seats</option>
            <option value="Interior Wipe Down">Interior Wipe Down</option>
            <option value="Deep Leather Cleaning">Deep Leather Cleaning</option>
            <option value="Deluxe Wax Protection">Deluxe Wax Protection</option>
            <option value="Executive Interior Detailing">
              Executive Interior Detailing
            </option>
            <option value="Full exterior body clay treatment">
              Full exterior body clay treatment
            </option>
          </select>
          <button type="submit" className="btn btn-sm btn-primary">
            Add a Facility
          </button>
        </form>
      </div>
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5">
        <button
          onClick={() => handleCreateService()}
          className="btn btn-sm btn-primary my-5 w-full"
        >
          Create Service
        </button>
      </div>
    </div>
  );
};

export default CreateService;

CreateService.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
