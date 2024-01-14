import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { removeFromLocalStorage } from "../utils/localstorage";
import SidebarMenu from "../components/Dashboard/SidebarMenu";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import SpeedometerLoader from "../components/UI/Loader/SpeedometerLoader";
import { routes } from "../constants/dashboardConstants";
import useProtectedRoute from "../hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [loading, setLoading] = useState(true);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

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

  if (loading) {
    return (
      <div>
        <SpeedometerLoader />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex bg-[#2a2a31] text-white h-screen overflow-hidden">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`h-screen bg-[#161921] drop-shadow-lg text-white min-h-[100vh] overflow-y-auto absolute sm:static left-0 top-0 z-50`}
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
            <div className="cursor-pointer" onClick={toggle}>
              <Image
                alt="Logo"
                className={`w-7 h-7 mx-2 ${isOpen ? "hidden sm:block" : ""}`}
                src="https://i.ibb.co/X3V212V/car-care-circle-logo.png"
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
            {routes?.map(
              (route, index) =>
                (route?.permission1 === decodedToken?.role ||
                  route?.permission2 === decodedToken?.role ||
                  route?.permission3 === decodedToken?.role) && (
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
                              className={`flex items-center text-white gap-[10px] p-2 border-r-4 border-transparent border-solid transition duration-200 ease-in-out cubic-bezier(0.6, -0.28, 0.735, 0.045) hover:bg-[#2a2a31] hover:border-r-4 hover:border-white hover:transition-[0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)] ${
                                route.path === router?.asPath
                                  ? "border-r-4 border-white bg-[#2a2a31]"
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
            <footer className="footer footer-center p-4 bg-[#161921] text-white">
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
