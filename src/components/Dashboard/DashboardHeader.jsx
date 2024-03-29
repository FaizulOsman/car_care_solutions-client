import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";

const DashboardHeader = ({ toggle, handleLogOut }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between px-6 bg-[#161921] drop-shadow-lg text-white h-12 border-l">
        <div className="ml-[45px] sm:ml-0 w-[30px] cursor-pointer hover:text-blue-600">
          <FaBars onClick={toggle} />
        </div>
        <div className="flex items-center justify-end">
          <Link
            href="/"
            className="hover:underline hover:text-blue-500 px-3 flex items-center gap-1"
          >
            <HiOutlineHome />
            <span className="hidden sm:inline-block"> Home</span>
          </Link>

          <Link
            onClick={() => handleLogOut()}
            href="/login"
            className="hover:underline hover:text-blue-500 flex items-center gap-1 border-l pl-3"
          >
            <HiOutlineLogout />
            <span className="hidden sm:inline-block"> Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
