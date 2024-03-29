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
    "/dashboard/cart",
    "/dashboard/bookings",
    "/dashboard/reviews",
    "/dashboard/feedbacks",
    "/dashboard/my-profile",
  ];
  const adminPages = [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/users/update/[userId]",
    "/dashboard/service/create-service",
    "/dashboard/service/all-service",
    "/dashboard/service/update/[serviceId]",
    "/dashboard/faq/create",
    "/dashboard/faq",
    "/dashboard/cart",
    "/dashboard/bookings",
    "/dashboard/reviews",
    "/dashboard/feedbacks",
    "/dashboard/my-profile",
  ];
  const superAdminPages = [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/add-new-admin",
    "/dashboard/users/update/[userId]",
    "/dashboard/service/create-service",
    "/dashboard/service/all-service",
    "/dashboard/service/update/[serviceId]",
    "/dashboard/faq/create",
    "/dashboard/faq",
    "/dashboard/cart",
    "/dashboard/bookings",
    "/dashboard/reviews",
    "/dashboard/feedbacks",
    "/dashboard/my-profile",
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
