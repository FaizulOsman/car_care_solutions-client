import {
  FaHome,
  FaUser,
  FaUsers,
  FaQuestionCircle,
  FaBars,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";
import { FcFaq, FcFeedback, FcServices } from "react-icons/fc";
import {
  MdCreateNewFolder,
  MdOutlineMiscellaneousServices,
  MdRateReview,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { removeFromLocalStorage } from "../utils/localstorage";
import SidebarMenu from "../components/Dashboard/SidebarMenu";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { RiUserAddFill } from "react-icons/ri";
import SpeedometerLoader from "../components/UI/Loader/SpeedometerLoader";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
    permission1: "user",
    permission2: "admin",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <FaUsers />,
    permission1: "",
    permission2: "admin",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/add-new-admin",
    name: "Add new admin",
    icon: <RiUserAddFill />,
    permission1: "",
    permission2: "",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/service",
    name: "Service",
    icon: <FcServices />,
    permission1: "",
    permission2: "admin",
    permission3: "super_admin",
    subRoutes: [
      {
        path: "/dashboard/service/create-service",
        name: "Create Service",
        icon: <MdCreateNewFolder />,
      },
      {
        path: "/dashboard/service/all-service",
        name: "All Services",
        icon: <MdOutlineMiscellaneousServices />,
      },
    ],
  },
  {
    path: "/dashboard/faq",
    name: "FAQ",
    icon: <FcFaq />,
    permission1: "",
    permission2: "admin",
    permission3: "super_admin",
    subRoutes: [
      {
        path: "/dashboard/faq/create",
        name: "Create FAQ",
        icon: <MdCreateNewFolder />,
      },
      {
        path: "/dashboard/faq",
        name: "All FAQ",
        icon: <FaQuestionCircle />,
      },
    ],
  },
  {
    path: "/dashboard/cart",
    name: "Wishlist",
    icon: <FaHeart />,
    permission1: "user",
    permission2: "admin",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/bookings",
    name: "Bookings",
    icon: <FaCalendarAlt />,
    permission1: "user",
    permission2: "admin",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/reviews",
    name: "Reviews",
    icon: <MdRateReview />,
    permission1: "user",
    permission2: "admin",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/feedbacks",
    name: "Feedbacks",
    icon: <FcFeedback />,
    permission1: "",
    permission2: "admin",
    permission3: "super_admin",
  },
  {
    path: "/dashboard/my-profile",
    name: "My Profile",
    icon: <FaUser />,
    permission1: "user",
    permission2: "admin",
    permission3: "super_admin",
  },
];

const DashboardLayout = ({ children }) => {
  const { router } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogOut = () => {
    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
  };

  const [myProfile, setMyProfile] = useState({});
  const fetchMyProfile = async () => {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access-token")
        : null;
    if (accessToken) {
      try {
        const url =
          "https://car-care-solutions-server.vercel.app/api/v1/users/my-profile";
        const options = {
          headers: {
            authorization: accessToken,
          },
        };
        const res = await fetch(url, options);
        const data = await res.json();
        setMyProfile(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  if (loading) {
    return (
      <div>
        <SpeedometerLoader />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex bg-[#080925] text-white h-screen overflow-hidden">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`h-screen bg-[#00073d] text-white min-h-[100vh] overflow-y-auto absolute sm:static left-0 top-0 z-50`}
        >
          <div className="flex items-center justify-between py-[10px]">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-lg leading-[0px] pl-2"
                >
                  CarCare
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="cursor-pointer">
              <Image
                alt="Logo"
                className={`w-7 h-7 mx-2 ${isOpen ? "hidden sm:block" : ""}`}
                src="https://i.ibb.co/cFVLjJ7/image-removebg-preview.png"
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
              {isOpen && (
                <div className="sm:hidden flex justify-center w-[43px] cursor-pointer hover:text-blue-500 py-[6px]">
                  <FaBars className="w-4 h-4" onClick={toggle} />
                </div>
              )}
            </div>
          </div>
          <section className="flex flex-col gap-[5px]">
            {routes.map(
              (route, index) =>
                (route?.permission1 === myProfile?.role ||
                  route?.permission2 === myProfile?.role ||
                  route?.permission3 === myProfile?.role) && (
                  <div key={index}>
                    {
                      <>
                        {route.subRoutes ? (
                          <SidebarMenu
                            setIsOpen={setIsOpen}
                            route={route}
                            showAnimation={showAnimation}
                            isOpen={isOpen}
                          />
                        ) : (
                          <Link href={route.path} passHref>
                            <div
                              className={`flex items-center text-white gap-[10px] p-2 border-r-4 border-transparent border-solid transition duration-200 ease-in-out cubic-bezier(0.6, -0.28, 0.735, 0.045) hover:bg-[#2d3359] hover:border-r-4 hover:border-white hover:transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] ${
                                route.path === router?.asPath
                                  ? "border-r-4 border-white bg-[#2d3359]"
                                  : ""
                              }`}
                            >
                              <div className={`icon ${!isOpen && "mx-auto"}`}>
                                {route.icon}
                              </div>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="whitespace-nowrap text-[15px]"
                                  >
                                    {route.name}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </Link>
                        )}
                      </>
                    }
                  </div>
                )
            )}
          </section>
        </motion.div>

        <div
          className={`${
            isOpen ? "w-full sm:w-[calc(100vw-200px)]" : "w-full"
          } flex flex-col`}
        >
          <div className="sticky top-0">
            <DashboardHeader toggle={toggle} handleLogOut={handleLogOut} />
          </div>
          <div className="ml-[45px] sm:ml-0 flex-grow overflow-y-auto">
            <div
              style={{ minHeight: "calc(100vh - 100px)" }}
              className="p-4 sm:p-7"
            >
              {children}
            </div>
            <footer className="footer footer-center p-4 bg-[#00073d] text-white">
              <div>
                <p>
                  Copyright © 2024 - All right reserved by Car Care Solutions
                  Ltd.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
