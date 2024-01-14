import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Loader from "../Loader";
import DashboardLayout from "../../../layouts/DashboardLayout";
import PlaceholderLoader from "../Loader/PlaceholderLoader";

const Table = ({
  tableTitle,
  page,
  setPage,
  limit,
  setLimit,
  meta,
  allData,
  sortOrder,
  setSortOrder,
  tableHeadData,
  tableBodyData,
}) => {
  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-[#161921] text-white flex overflow-hidden text-sm rounded-md">
      <div className="flex-grow overflow-y-auto">
        <div className="z-40 flex flex-col w-full border-b border-gray-700 sticky top-0 px-4 pt-4">
          <div className="flex w-full items-center">
            <div className="flex items-center text-lg sm:text-2xl z-40 mb-5 border-l-4 pl-3">
              {tableTitle}
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="flex w-full items-center mb-7">
            {!!totalPage && (
              <select
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSortOrder(selectedValue);
                }}
                className="select select-bordered border-gray-800 font-normal select-xs sm:select-sm max-w-xs bg-[#161921]"
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
            )}
            {!!totalPage && (
              <div className="ml-auto text-xs inline-flex items-center">
                <span className="mr-3 hidden sm:inline-block">
                  Limit {limit}
                </span>
                <button
                  onClick={() => setLimit(parseInt(limit) - 1)}
                  className={`mr-3 inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border ${
                    parseInt(limit) === 1
                      ? "opacity-50 cursor-not-allowed border-gray-800"
                      : "border-gray-600"
                  } leading-none`}
                  disabled={parseInt(limit) === 1}
                >
                  <BiChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    page === totalPage || setLimit(parseInt(limit) + 1);
                  }}
                  className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border ${
                    page === totalPage
                      ? "opacity-50 cursor-not-allowed border-gray-800"
                      : "border-gray-600"
                  } leading-none`}
                  disabled={parseInt(limit) === parseInt(meta?.total)}
                >
                  <BiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          {allData ? (
            <div style={{ overflowX: "auto" }}>
              {allData?.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="">
                    <tr>{tableHeadData?.map((data) => data)}</tr>
                    <tr className="font-normal border-b border-gray-800"></tr>
                  </thead>
                  <tbody>{tableBodyData?.map((data) => data)}</tbody>
                </table>
              ) : (
                <div className="min-h-[30vh] flex items-center justify-center">
                  <h2 className="text-md sm:text-xl md:text-2xl text-red-500">
                    No data found
                  </h2>
                </div>
              )}
            </div>
          ) : (
            <div className="min-h-[30vh] flex items-center">
              <PlaceholderLoader />
            </div>
          )}
          {!!totalPage && (
            <div className="flex flex-wrap w-full mt-5 gap-2 justify-end">
              <button
                onClick={() => handlePageChange(page - 1)}
                className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border ${
                  page === 1
                    ? "opacity-50 cursor-not-allowed border-gray-800"
                    : "border-gray-600"
                } leading-none`}
                disabled={page === 1}
              >
                <BiChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPage }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border ${
                    page === index + 1
                      ? "bg-green-700 border-gray-800"
                      : "border-gray-600"
                  } leading-none`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                className={`inline-flex items-center h-6 w-6 sm:h-8 sm:w-8 justify-center rounded-md shadow border ${
                  page === totalPage
                    ? "opacity-50 cursor-not-allowed border-gray-800"
                    : "border-gray-600"
                } leading-none`}
                disabled={page === totalPage}
              >
                <BiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;

Table.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
