import { createContext, useContext, useEffect, useState } from "react";

export const GlobalSiteContext = createContext();
export function GlobalSiteProvider({ children }) {
  const [siteConfig, setSiteConfig] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/api/siteconfig`);
        const json = await result.json();
        setSiteConfig(json);
      } catch (error) {
        setSiteConfig(null);
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //console.log(siteConfig);
  return (
    <GlobalSiteContext.Provider value={siteConfig}>
      {children}
    </GlobalSiteContext.Provider>
  );
}
export default function useGlobalConfig() {
  return useContext(GlobalSiteContext);
}
