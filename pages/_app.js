import "../styles/globals.css";

import Navbar from "../components/layout/Navbar";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import { UserProvider } from "../components/UserContext";
import { withUser } from "../components/WithUser";

Amplify.configure({
  ...config,
  ssr: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <UserProvider> */}
      <Navbar />
      <Component {...pageProps} />
      {/* </UserProvider> */}
    </>
  );
}

export default MyApp;
