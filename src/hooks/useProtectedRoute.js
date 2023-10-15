import { useEffect } from "react";
import { useRouter } from "next/router";

// A custom hook that checks the user's role and redirects them to the appropriate page
const useProtectedRoute = (role) => {
  // Get the router object from nextjs
  const router = useRouter();

  // Get the current path of the page
  const path = router.pathname;

  // Define the pages that each role can access
  const userPages = [
    "/",
    "/dashboard",
    "/dashboard/my-profile",
    "/dashboard/cart",
    "/dashboard/bookings",
    "/dashboard/reviews",
  ];
  const adminPages = [
    "/exam/[...segments]",
    "/dashboard",
    "/dashboard/users",
    "/dashboard/users/update/[userId]",
    "/dashboard/my-profile",
    "/dashboard/service/update/[serviceId]",
    "/dashboard/service/all-service",
    "/dashboard/service/create-service",
    "/dashboard/cart",
    "/dashboard/bookings",
    "/dashboard/feedbacks",
    "/dashboard/reviews",
  ];
  const superAdminPages = [
    "/exam/[...segments]",
    "/dashboard",
    "/dashboard/users",
    "/dashboard/users/update/[userId]",
    "/dashboard/service/update/[serviceId]",
    "/dashboard/service/all-service",
    "/dashboard/service/create-service",
    "/dashboard/my-profile",
    "/dashboard/cart",
    "/dashboard/bookings",
    "/dashboard/feedbacks",
    "/dashboard/reviews",
  ];
  const guestPages = ["/"];

  // Define a function that redirects the user to the home page if they are not authorized
  const redirect = () => {
    router.push("/");
  };

  // Use the useEffect hook to run the logic when the component mounts or updates
  useEffect(() => {
    // Check if the user's role matches the required role for the current page
    if (role === "user" && !userPages.includes(path)) {
      // If not, redirect them to the home page
      redirect();
    } else if (role === "admin" && !adminPages.includes(path)) {
      // If not, redirect them to the home page
      redirect();
    } else if (role === "super_admin" && !superAdminPages.includes(path)) {
      // If not, redirect them to the home page
      redirect();
    } else if (role === "guest" && !guestPages.includes(path)) {
      // If not, redirect them to the home page
      router.push("/login");
    }
  }, [role, path]);
};

export default useProtectedRoute;
