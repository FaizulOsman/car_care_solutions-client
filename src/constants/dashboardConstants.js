import {
  FaHome,
  FaUser,
  FaUsers,
  FaQuestionCircle,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";
import { FcFaq, FcFeedback, FcServices } from "react-icons/fc";
import {
  MdCreateNewFolder,
  MdOutlineMiscellaneousServices,
  MdRateReview,
} from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";

export const routes = [
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
    permission1: "user",
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
