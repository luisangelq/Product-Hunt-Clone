import App from "next/app";
import firebase, { FirebaseContext } from "../firebase/index";
import authUser from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
  const user = authUser();

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
