import { createContext, useContext } from "react";
import { useSessionStorage } from "react-use";

export const PageViewContext = createContext();
export function PageViewProvider({ children }) {
  const [pageView, setPageView] = useSessionStorage("pageView", 0);

  return (
    <PageViewContext.Provider value={{ pageView, setPageView }}>
      {children}
    </PageViewContext.Provider>
  );
}
export default function usePageView() {
  return useContext(PageViewContext);
}
