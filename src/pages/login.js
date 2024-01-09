import React, { useState, useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { saveToLocalStorage } from "../utils/localstorage";
import { useLoginMutation, useSignUpMutation } from "../redux/user/userApi";
import CopyToClipboard from "../components/UI/CopyToClipboard";

const Login = () => {
  const [isLoginActive, setLoginActive] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleTabToggle = () => {
    setLoginActive(!isLoginActive);
  };

  const [
    login,
    {
      data: loginData,
      isError: loginIsError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      error: loginError,
    },
  ] = useLoginMutation();

  const [
    signUp,
    {
      data: signUpData,
      isError: signUpIsError,
      isLoading: signUpIsLoading,
      isSuccess: signUpIsSuccess,
      error: signUpError,
    },
  ] = useSignUpMutation();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    login({ email: e.target.email.value, password: e.target.password.value });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const newData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "user",
      phone: e.target.phone.value,
    };

    try {
      await signUp(newData);
      saveToLocalStorage("access-token", loginData?.data?.accessToken);
      saveToLocalStorage(
        "user-info",
        JSON.stringify(loginData?.data?.userData)
      );
    } catch (error) {
      toast.error(`${error?.data?.message}` || "Something went wrong");
    }
  };

  const state = router.query.state;
  useEffect(() => {
    if (loginIsSuccess && !loginIsLoading) {
      if (state?.path) {
        router.push(state?.path);
      } else {
        router.push("/");
      }
      toast.success("You have logged in successfully.");
      saveToLocalStorage("access-token", loginData?.data?.accessToken);
      saveToLocalStorage(
        "user-info",
        JSON.stringify(loginData?.data?.userData)
      );
    }
    if (loginIsError === true && loginError) {
      if ("data" in loginError) {
        toast.error(`${loginError?.data.message}`);
      }
    }
  }, [
    loginIsLoading,
    router,
    state,
    loginIsSuccess,
    loginError,
    loginIsError,
    loginData,
  ]);

  useEffect(() => {
    if (signUpIsSuccess && !signUpIsLoading) {
      if (state?.path) {
        router.push(state?.path);
      } else {
        router.push("/");
      }
    }

    if (signUpIsError) {
      toast.error(`${signUpError?.data?.message}` || "Something went wrong");
    }

    if (signUpIsSuccess) {
      toast.success("Successfully registered, Please login now!");
    }
  }, [
    signUpIsLoading,
    router,
    state,
    signUpIsSuccess,
    signUpError,
    signUpIsError,
    signUpData,
  ]);

  const [eyeShow, setEyeShow] = useState(true);
  const handlePasswordToggle = (passwordType) => {
    const passwordInput = document.getElementById(passwordType);

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  return (
    <div
      style={{
        background:
          'url("https://t4.ftcdn.net/jpg/04/31/19/89/360_F_431198909_DwGgs82ot1BTZ7wu6dnvwpBRTKVDZROd.jpg")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex justify-center items-center min-h-[100vh]">
        <div
          className={`bg-[#ffdcdc68] box flex flex-row relative px-5 pb-7 ${
            isLoginActive ? "h-[500px]" : "h-[570px]"
          } w-[350px] rounded-[30px] border-[3px] border-[#ffffff33]`}
        >
          <div className="absolute -top-16 right-[44%] md:-right-16">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="border-[#ffdcdc68] bg-[#ffdcdc68] rounded-full flex items-center justify-center"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <Image
                  alt="avatar"
                  className={`w-10 h-10 rounded-full p-[2px] bg-[#ffdcdc68] cursor-pointer`}
                  src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className="absolute -left-[65px] md:left-0 z-50 mt-2 w-44 origin-top-right rounded-lg bg-[#ffdcdc68] shadow-lg border-2 border-[#ffffff33]"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="bg-[#7a6e70] rounded-lg">
                  <div className="relative bg-[#ffdcdc68] rounded-lg">
                    <div className="text-[#1F2937] text-sm">
                      <div className="text-sm hover:bg-[#fbdddd68] block px-4 py-2 duration-300">
                        <strong>Super Admin</strong>
                        <p className="relative">
                          <strong>Email:</strong> super-admin@gmail.com
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="super-admin@gmail.com"
                              styles="w-[10px] h-[10px] hover:text-blue-500 cursor-pointer"
                            />
                          </span>
                        </p>
                        <p className="relative">
                          <strong>Password:</strong> 123456
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="123456"
                              styles="w-[10px] h-[10px] hover:text-blue-500 cursor-pointer"
                            />
                          </span>
                        </p>
                      </div>
                      <div className="hover:bg-[#fbdddd68] block px-4 py-2 duration-300">
                        <strong>User</strong>
                        <p className="relative">
                          <strong>Email:</strong> user@gmail.com
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="user@gmail.com"
                              styles="w-[10px] h-[10px] hover:text-blue-500 cursor-pointer"
                            />
                          </span>
                        </p>
                        <p className="relative">
                          <strong>Password:</strong> 123456
                          <span className="absolute right-0 top-[6px]">
                            <CopyToClipboard
                              text="123456"
                              styles="w-[10px] h-[10px] hover:text-blue-500 cursor-pointer"
                            />
                          </span>
                        </p>
                      </div>
                      <div className="absolute top-0 left-[48%] md:left-[20px] transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-[#b09b9c] border-l border-t border-[#ffdcdc68]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`absolute w-[85%] left-[27px] ease-in-out duration-500`}
            id={isLoginActive ? "login" : "register"}
          >
            <div className="text-center mt-[30px] mb-5">
              <h3 className="text-[22px] font-semibold mb-2">
                {isLoginActive ? "Hello, Again!" : "Sign Up, Now!"}
              </h3>
              <small>
                {isLoginActive
                  ? "We are happy to have you back."
                  : "We are happy to have you with us."}
              </small>
            </div>
            <div className="flex flex-col w-full">
              {isLoginActive ? (
                <form onSubmit={(e) => handleSubmitLogin(e)}>
                  <div className="my-3 relative">
                    <input
                      type="text"
                      name="email"
                      className="input-box w-full h-[50px] text-[15px] text-[#040404] border-none rounded-[10px] outline-none"
                      id="logEmail"
                      required
                    />
                    <label
                      className="absolute left-[20px] top-[15px] text-[15px] ease-in-out duration-300"
                      htmlFor="logEmail"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="my-3 relative">
                    <input
                      type="password"
                      name="password"
                      className="input-box w-full h-[50px] text-[15px] text-[#040404] border-none rounded-[10px] outline-none"
                      id="logPassword"
                      required
                    />
                    <label
                      className="absolute left-[20px] top-[15px] text-[15px] ease-in-out duration-300"
                      htmlFor="logPassword"
                    >
                      Password
                    </label>
                    <div className="absolute top-[15px] right-[25px]">
                      <div
                        className="flex justify-center items-center relative"
                        onClick={() => {
                          handlePasswordToggle("logPassword");
                          setEyeShow(!eyeShow);
                        }}
                      >
                        {eyeShow ? (
                          <IoEyeOutline id="eye" className="cursor-pointer" />
                        ) : (
                          <IoEyeOffOutline
                            id="eye-slash"
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-[13px] text-[#000000] mt-[12px] mb-[20px]">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="formCheck"
                      className="mr-2 w-[14px]"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="formCheck">Remember Me</label>
                  </div>
                  <div className="my-3 relative">
                    <input
                      type="submit"
                      className="input-submit w-full h-[50px] text-[15px] font-semibold border-none rounded-[10px] bg-[#bc6202] text-white cursor-pointer"
                      value="Sign In"
                      required
                    />
                  </div>
                </form>
              ) : (
                <form onSubmit={(e) => handleSubmitSignUp(e)}>
                  <div className="my-3 relative">
                    <input
                      type="text"
                      name="name"
                      className="input-box w-full h-[50px] text-[15px] text-[#040404] border-none rounded-[10px] outline-none"
                      id="regUsername"
                      required
                    />
                    <label
                      className="absolute left-[20px] top-[15px] text-[15px] ease-in-out duration-300"
                      htmlFor="regUsername"
                    >
                      Username
                    </label>
                  </div>
                  <div className="my-3 relative">
                    <input
                      type="text"
                      name="email"
                      className="input-box w-full h-[50px] text-[15px] text-[#040404] border-none rounded-[10px] outline-none"
                      id="regEmail"
                      required
                    />
                    <label
                      className="absolute left-[20px] top-[15px] text-[15px] ease-in-out duration-300"
                      htmlFor="regEmail"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="my-3 relative">
                    <input
                      type="number"
                      name="phone"
                      className="input-box w-full h-[50px] text-[15px] text-[#040404] border-none rounded-[10px] outline-none"
                      id="phone"
                      required
                    />
                    <label
                      className="absolute left-[20px] top-[15px] text-[15px] ease-in-out duration-300"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                  </div>
                  <div className="my-3 relative">
                    <input
                      type="password"
                      name="password"
                      className="input-box w-full h-[50px] text-[15px] text-[#040404] border-none rounded-[10px] outline-none"
                      id="regPassword"
                      defaultValue=""
                      required
                    />
                    <label
                      className="absolute left-[20px] top-[15px] text-[15px] ease-in-out duration-300"
                      htmlFor="regPassword"
                    >
                      Password
                    </label>
                    <div className="absolute top-[15px] right-[25px]">
                      <div
                        className="flex justify-center items-center relative"
                        onClick={() => {
                          handlePasswordToggle("regPassword");
                          setEyeShow(!eyeShow);
                        }}
                      >
                        {eyeShow ? (
                          <IoEyeOutline id="eye" className="cursor-pointer" />
                        ) : (
                          <IoEyeOffOutline
                            id="eye-slash"
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="my-3 relative">
                    <input
                      type="submit"
                      className="input-submit w-full h-[50px] text-[15px] font-semibold border-none rounded-[10px] bg-[#bc6202] text-white cursor-pointer"
                      value="Sign Up"
                      required
                    />
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="switch flex absolute bottom-[50px] left-[25px] w-[85%] h-[50px] bg-[#ffffff29] rounded-[10px] overflow-hidden">
            <a
              href="#"
              className={`login ${
                isLoginActive ? "active" : ""
              } flex justify-center items-center text-[14px] font-semibold text-[#000] w-[50%] h-[50px] rounded-[10px] z-10`}
              onClick={handleTabToggle}
            >
              Login
            </a>
            <a
              href="#"
              className={`register ${
                isLoginActive ? "" : "active"
              } flex justify-center items-center text-[14px] font-semibold text-[#000] w-[50%] h-[50px] rounded-[10px] z-10`}
              onClick={handleTabToggle}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
