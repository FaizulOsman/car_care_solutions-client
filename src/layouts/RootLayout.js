import { useEffect, useState } from "react";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";
import SpeedometerLoader from "../components/UI/Loader/SpeedometerLoader";

const RootLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <SpeedometerLoader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] mt-14">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
