import Link from "@reusables/Link";
import useEmailSignupModal from "@contexts/EmailSignupModalContext";
import useGlobalConfig from "@contexts/GlobalSiteContext";
import ReactGA from "react-ga";
import dynamic from "next/dynamic";
const EmailSignupModal = dynamic(() => import("./../modal/EmailSignupModal"));

export default function Notice() {
  const config = useGlobalConfig();
  const { siteConfigOptions } = config || {};
  const { showMailchimp } = siteConfigOptions || {};
  const { openModal } = useEmailSignupModal();
  return (
    <div className="sticky top-0 bg-dynamic-red text-white z-50">
      <div className="container h-[52px] mx-auto flex justify-center items-center md:font-semibold text-sm sm:text-base  md:text-lg">
        {showMailchimp && (
          <div>
            <a
              target="_blank"
              rel="noreferrer nofollow"
              href="https://mailchi.mp/dynamicbusiness/smartpay-white-paper-improve-profit-margins"
            >
              How to improve profit margins by reducing costs - Free white paper
            </a>
          </div>
        )}

        <div className="hiring absolute top-0 right-0 h-full flex items-center font-normal text-base mr-4">
          <div className="hidden lg:block">
            <Link
              href="https://mailchi.mp/dynamicbusiness/db-lets-talk-contributor-call-out-newsletter"
              className="underline"
            >
              PR & Marketing Call Out List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
