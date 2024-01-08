import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] mt-14">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
