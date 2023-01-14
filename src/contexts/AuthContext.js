import { useState, useEffect, createContext, useContext } from "react";
import ReactGA from "react-ga";
import { supabase } from "../lib/supabaseClient";

import useModal from "@contexts/LoginModalContext";
import axios from "axios";
import { useRouter } from "next/router";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const { closeModal } = useModal();
  const [error, setError] = useState(null);

  useEffect(async () => {
    const session = supabase.auth.session();
    await fetch("/api/auth/cookie", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({
        event: session ? "SIGNED_IN" : "SIGNED_OUT",
        session,
      }),
    });
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await fetch("/api/auth/cookie", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
        if (event === "SIGNED_IN") {
          setLoadingUser(true);
          const currentUser = session?.user || null;
          const { receiveNotifications } = router.query;
          if (currentUser) {
            setUser(currentUser);
            setLoadingUser(false);
            console.log({ receiveNotifications });
            if (receiveNotifications === "1") {
              console.log("SENT ZAP");
              const { data } = await axios.post("/api/slack/login", {
                user: currentUser,
              });
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setLoadingUser(false);
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(async () => {
    setLoadingUser(true);
    const currentUser = await supabase.auth.user();
    if (currentUser) {
      setUser(currentUser);
      setLoadingUser(false);
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, []);
  // const handleUser = async (rawUser) => {
  //   if (rawUser) {
  //     const { jwtToken, uid, ...restUserInfo } = formatUser(rawUser);
  //     const userInfo = await createUser(uid, restUserInfo);
  //     setUser({ jwtToken, ...userInfo });
  //     return userInfo;
  //   } else {
  //     setUser(null);
  //     return false;
  //   }
  // };
  const handleUser = () => {};
  // const signinWithGoogle = () => {
  //   return signInWithPopup(getAuth(), new GoogleAuthProvider()).then(
  //     (response) => {
  //       handleUser(response.user);
  //       closeModal();
  //     }
  //   );
  // };
  const signinWithGoogle = async (receiveNotifications) => {
    try {
      const { slug } = router.query;
      const storySlug = slug?.[slug?.length - 1];

      //remove any previous query params
      const sanitizedLocation = window.location.href.split("?")[0];
      await supabase.auth.signIn(
        {
          provider: "google",
        },
        {
          redirectTo: storySlug
            ? `${sanitizedLocation}?scrollToComments=1&receiveNotifications=${
                receiveNotifications ? "1" : "0"
              }`
            : sanitizedLocation,
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      // closeModal();
    }
  };
  // const signinWithFacebook = () => {
  //   return signInWithPopup(getAuth(), new FacebookAuthProvider()).then(
  //     (response) => {
  //       handleUser(response.user);
  //       closeModal();
  //     }
  //   );
  // };
  const signinWithFacebook = () => {};

  // const signout = () => getAuth().signOut();
  const signout = () => {
    supabase.auth.signOut();
    setUser(null);
  };
  const isLoggedIn = user != null;

  // useEffect(() => {
  //   return getAuth().onAuthStateChanged(
  //     (u) => handleUser(u),
  //     (e) => setError(e)
  //   );
  // }, []);
  useEffect(() => {
    if (user) {
      ReactGA.set({ userId: user.uid });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        error,
        isLoggedIn,
        signout,
        signinWithGoogle,
        signinWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
