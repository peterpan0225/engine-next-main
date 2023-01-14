import Footer from "./Footer";
import Header from "./header/Header";
import Modal from "./modal/Modal";
import { useEffect } from "react";
import SearchModal from "./modal/SearchModal";
import useSearchModal from "@contexts/SearchModalContext";

export default function Layout({ pageType, children }) {
  const { disabled, setDisabled } = useSearchModal();
  useEffect(() => {
    googletag.cmd.push(function () {
      googletag.destroySlots();
    });
  }, []);

  useEffect(() => {
    const isSearchPage = window.location.pathname === "/search";
    if (isSearchPage && !disabled) {
      setDisabled(true);
    }
    if (!isSearchPage && disabled) {
      setDisabled(false);
    }
  }, []);
  return (
    <>
      <div id="__dynamicbusiness">
        <a className="skip-link sr-only" href="#maincontent">
          Skip to main
        </a>
        <Header pageType={pageType} />
        <Modal />
        <SearchModal />
        <main id="maincontent" className="pb-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
