import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { AnylitcsID, Analytics4ID } from "../CONSTANTS";
import ReactGA from "react-ga";
import ReactGA4 from "react-ga4";

import usePageView from "@contexts/PageViewContext";

export const AnylitcsContext = createContext();
export function AnylitcsContextProvider({ children }) {
  const [currentUrl, setCurrentUrl] = useState(null);
  const { setPageView } = usePageView();
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, [router.events]);
  useEffect(() => {
    function handlePopstate(event) {
      if (!event.state) {
        window.location.reload();
      }
    }
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);
  useEffect(() => {
    setCurrentUrl(window.location.pathname);
  }, []);
  useEffect(() => {
    ReactGA.initialize(AnylitcsID);
    ReactGA4.initialize(Analytics4ID);
    window.GA_INITIALIZED = true;
  }, []);
  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentUrl(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (currentUrl) {
      ReactGA.pageview(currentUrl);
      ReactGA4.send({ hitType: "pageview", page: currentUrl });
      // console.log("Send page view", currentUrl);
      setPageView((p) => parseInt(p) + 1);
    }
  }, [currentUrl, setPageView]);

  return (
    <AnylitcsContext.Provider
      value={{
        setCurrentUrl,
      }}
    >
      {children}
    </AnylitcsContext.Provider>
  );
}

export default function useAnylitcs() {
  return useContext(AnylitcsContext);
}
