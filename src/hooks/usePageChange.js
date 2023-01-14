import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useAnylitcs from "@contexts/AnylitcsContext";
export default function usePageChange({ url, title, firstPage = false }) {
  const { ref, inView } = useInView({
    threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
  });

  const [pageViewed, setPageViewed] = useState(firstPage ? firstPage : false);
  const { setCurrentUrl } = useAnylitcs();

  useEffect(() => {
    const pathName = window.location.pathname;
    const isCurrentPage = pathName === url;
    const isNewPage = inView && !isCurrentPage;
    if (isNewPage) {
      window.history.replaceState(null, "", url);
      document.title = title;
      if (!pageViewed) {
        setPageViewed(true);
        setCurrentUrl(url);
        //console.log(url);
      }
    }
  }, [inView, url, title, firstPage, pageViewed, setCurrentUrl]);

  return ref;
}
