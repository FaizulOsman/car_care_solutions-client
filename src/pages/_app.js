import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../redux/store";

// Global Styles (Sass)
import "../styles/_global.scss";

// Imported Styles
import "../styles/globals.css";
import "../styles/components/navbar.css";
import "../styles/components/footer.css";
import "../styles/components/sectionTopHeader.css";
import "../styles/components/SpeedometerLoader.css";
import "../styles/components/about-us.css";
import "../styles/components/hero.css";
import "../styles/components/latest-news.css";
import "../styles/components/login-signup.css";
import "../styles/components/charts.css";
import "../styles/components/placeholderLoader.css";
import "../styles/components/boxLoader.css";
import "../styles/components/loader.css";
import "../styles/components/services.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider store={store}>
      <SessionProvider session={pageProps?.session}>
        <Toaster />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
