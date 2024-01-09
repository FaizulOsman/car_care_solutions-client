import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localstorage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { FaLinkedin, FaRegClock } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaSquareFacebook, FaSquareTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [myProfile, setMyProfile] = useState({});
  const [screenWidth, setScreenWidth] = useState(0);
  const router = useRouter();
  const statePath = router.query.state?.path;

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleSignOut = () => {
    const path = statePath || "/login";
    router.push(path);

    removeFromLocalStorage("user-info");
    removeFromLocalStorage("access-token");
    toast.success("Successfully Signed Out!");
    setMyProfile({});
  };

  const fetchMyProfile = async () => {
    const accessToken = getFromLocalStorage("access-token");
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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${scrollPosition > 150 && "mb-[102px] md:mb-[116px]"}`}>
      <div className="th-header header-layout4">
        <div className="header-top-area relative">
          <Link href="/">
            {screenWidth > 768 ? (
              <img
                className="absolute top-8 left-[5%] w-[150px] lg:w-52 xl:w-60 h-[72px] lg:h-20 z-50"
                src="https://i.ibb.co/z6g4fYV/car-service-logo-design-illustration-car-repair-logo-vector-removebg-preview.png"
                alt=""
              />
            ) : (
              <img
                className={`absolute rounded-full z-50 ${
                  screenWidth < 480
                    ? "top-[40px] left-[5%] w-16 h-16"
                    : "top-[35px] left-[5%] w-20 h-20"
                }`}
                src="https://i.ibb.co/njnzYtD/car-care-circle.jpg"
                alt=""
              />
            )}
          </Link>
          <span className="absolute top-5 left-[15%] text-white">Car Care</span>
          <div className="header-top">
            <div className="w-11/12 max-w-[1200px] mx-auto">
              <div className="flex justify-center md:justify-between items-center">
                <p className="hidden lg:block pl-0 md:pl-[400px] font-bold">
                  Welcome to Car Care Solutions
                </p>
                <div className="flex items-center gap-3 mx-auto pl-20 lg:pl-0 lg:mx-0">
                  <span className="font-semibold">Follow Us:</span>
                  <FaSquareFacebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
                  <FaLinkedin className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                  <FaSquareTwitter className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="menu-top h-[100px] flex items-center">
            <div className="w-11/12 max-w-[1200px] mx-auto text-white">
              <div className="flex justify-between items-center pl-[45%] sm:pl-[220px] md:pl-[350px] lg:pl-[400px]">
                <div className="flex gap-10">
                  <div className="hidden sm:flex items-center gap-2">
                    <IoMailOpenOutline className="w-8 h-8" />
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-sm text-gray-400">Make An Email</p>
                      <h4 className="text-base font-semibold hover:text-[#eb3300] duration-300 cursor-pointer">
                        info@malen.com
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiCustomerService2Line className="w-8 h-8" />
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-sm text-gray-400">Call Us 24/7</p>
                      <h4 className="text-base font-semibold hover:text-[#eb3300] duration-300 cursor-pointer">
                        +0123456789
                      </h4>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center gap-2">
                    <FaRegClock className="w-8 h-8" />
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-sm text-gray-400">Office Hours</p>
                      <h4 className="text-base font-semibold hover:text-[#eb3300] duration-300 cursor-pointer">
                        Mon-Sat 8am-6pm
                      </h4>
                    </div>
                  </div>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-wrapper">
          <div
            className={`bg-[#070a10] z-50 w-full ${
              scrollPosition > 150
                ? "sticky-top fixed top-0 shadow-md border-b-0"
                : ""
            }`}
          >
            <div className="w-11/12 max-w-[1200px] mx-auto">
              <div className={`navbar-wrapper__body py-[10px] md:py-3`}>
                <div className="hidden md:flex md:items-center md:w-fit gap-4">
                  <li
                    className={`left-menus__menu hidden md:inline-block font-semibold`}
                  >
                    <Link href="/">Home</Link>
                  </li>
                  <li
                    className={`left-menus__menu hidden md:inline-block font-semibold`}
                  >
                    <Link href="/services">Services</Link>
                  </li>
                  <li
                    className={`left-menus__menu hidden md:inline-block font-semibold`}
                  >
                    <Link href="/latest-news">Latest News</Link>
                  </li>
                  <li
                    className={`left-menus__menu hidden md:inline-block font-semibold`}
                  >
                    <Link href="/faq">FAQ</Link>
                  </li>
                  <li
                    className={`left-menus__menu hidden md:inline-block font-semibold`}
                  >
                    <Link href="/contact-us">Contact</Link>
                  </li>
                </div>
                {/* right side menu for large devices  */}
                <div className="body__right-menus hidden md:flex md:items-center gap-4">
                  {myProfile?.email ? (
                    <>
                      <li
                        className={`px-2 flex items-center border-2 hover:border-[#eb3300] rounded-lg hover:bg-[#eb3300] duration-300  `}
                      >
                        <Link
                          className="btn-link hover:no-underline"
                          href="/dashboard"
                        >
                          <h6 className={`btn-text text-white`}>Dashboard</h6>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="flex items-center border-2 border-[#eb3300] rounded-lg bg-[#eb3300] hover:bg-transparent hover:border-white duration-300 py-[2px]">
                      <Link href="/login">
                        <h6 className="btn-text text-white px-2">
                          Login/SignUp
                        </h6>
                      </Link>
                    </li>
                  )}
                  <svg
                    onClick={() => setIsOpen(true)}
                    className="small-device__sidebar-toggle w-52 h-52 cursor-pointer hover:text-[#eb3300] duration-300"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MenuIcon"
                  >
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                  </svg>
                </div>
                {/* left side menu for large devices  */}
                <div className="md:hidden flex items-center w-full justify-between gap-4">
                  {myProfile?.email ? (
                    <li className="flex items-center rounded-lg hover:bg-[#eb3300] border-2 hover:border-[#eb3300] border-white duration-300 px-3 py-[2px]">
                      <Link href="/dashboard">
                        <h6 className="btn-text text-white">Dashboard</h6>
                      </Link>
                    </li>
                  ) : (
                    <li className="flex items-center border-2 border-[#eb3300] rounded-lg bg-[#eb3300] hover:bg-transparent hover:border-white duration-300 px-3 py-[1px]">
                      <Link href="/login">
                        <h6 className="btn-text text-white">Login/SignUp</h6>
                      </Link>
                    </li>
                  )}
                  <svg
                    onClick={() => setIsOpen(true)}
                    className="small-device__sidebar-toggle cursor-pointer hover:text-[#eb3300] duration-300"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MenuIcon"
                  >
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                  </svg>
                </div>

                {/* Sidebar  */}
                <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
                  <div className={`sidebar ${isOpen ? "" : "closeAnimation"}`}>
                    <div className="sidebar__header">
                      <div className="header__logoArea">
                        <Link href="/">
                          <Image
                            alt="Logo"
                            className="w-8 h-8 rounded-full"
                            src="https://i.ibb.co/njnzYtD/car-care-circle.jpg"
                            decoding="async"
                            loading="lazy"
                            width={300}
                            height={300}
                          />
                        </Link>
                      </div>
                      <div className="header__closeButton">
                        <button
                          onClick={() => setIsOpen(false)}
                          className="button"
                        >
                          <AiOutlineClose className="button-icon" />
                        </button>
                      </div>
                    </div>
                    <div className="sidebar__body">
                      <li
                        onClick={() => setIsOpen(false)}
                        className="body__menu"
                      >
                        <Link
                          href="/services"
                          className="w-full block hover:text-[#eb3300] px-2 p-1 rounded-md"
                        >
                          Services
                        </Link>
                      </li>
                      <li
                        onClick={() => setIsOpen(false)}
                        className="body__menu"
                      >
                        <Link
                          href="/latest-news"
                          className="w-full block hover:text-[#eb3300] px-2 p-1 rounded-md"
                        >
                          Latest News
                        </Link>
                      </li>
                      <li
                        onClick={() => setIsOpen(false)}
                        className="body__menu"
                      >
                        <Link
                          href="/faq"
                          className="w-full block hover:text-[#eb3300] px-2 p-1 rounded-md"
                        >
                          FAQ
                        </Link>
                      </li>
                      <li
                        onClick={() => setIsOpen(false)}
                        className="body__menu"
                      >
                        <Link
                          href="/feedback"
                          className="w-full block hover:text-[#eb3300] px-2 p-1 rounded-md"
                        >
                          Feedback
                        </Link>
                      </li>
                      <li
                        onClick={() => setIsOpen(false)}
                        className="body__menu"
                      >
                        <Link
                          href="/contact-us"
                          className="w-full block hover:text-[#eb3300] px-2 p-1 rounded-md"
                        >
                          Contact Us
                        </Link>
                      </li>
                      {myProfile?.email ? (
                        <li
                          onClick={() => setIsOpen(false)}
                          className="body__menu"
                        >
                          <Link
                            href="#"
                            onClick={() => handleSignOut()}
                            className="w-full block hover:text-[#eb3300] px-2 p-1 rounded-md"
                          >
                            Logout
                          </Link>
                        </li>
                      ) : (
                        <li
                          onClick={() => setIsOpen(false)}
                          className="mx-4 text-white text-center"
                        >
                          <Link
                            href="/login"
                            className="w-full block border-2 border-[#eb3300] bg-[#eb3300] hover:bg-transparent hover:text-[#eb3300] duration-300 text-white px-2 p-1 rounded-md"
                          >
                            Login
                          </Link>
                        </li>
                      )}
                    </div>
                  </div>
                  <div
                    className="sidebar__backdrop"
                    onClick={() => setIsOpen(false)}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
