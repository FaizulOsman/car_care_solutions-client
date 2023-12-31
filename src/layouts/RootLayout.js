import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] mt-20 md:mt-28">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
