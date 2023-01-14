import Link from "@reusables/NavLink";
import SocialMedia from "./SocialMedia";
import ReadMenu from "./ReadMenu";
import LearnMenu from "./LearnMenu";
import UserLogin from "./UserLogin";
import useSearchModal from "@contexts/SearchModalContext";

export default function Navbar() {
  const { openModal, disabled } = useSearchModal();
  return (
    <>
      <div className="py-2 md:py-3 container mx-auto relative">
        <div className="flex justify-center">
          <nav
            style={{ zIndex: 100 }}
            className=" relative flex px-4 w-full sm:w-auto sm:space-x-2 md:space-x-4 lg:space-x-8 uppercase items-center justify-between text-[14px] sm:text-base"
          >
            <Link
              href="/"
              className="whitespace-nowrap hover:underline"
              activeClassName="font-semibold md:font-bold text-dynamic-red"
            >
              Home
            </Link>
            <ReadMenu />
            <Link
              href="/page/contact-us"
              className="whitespace-nowrap hover:underline"
              activeClassName="font-semibold md:font-bold text-dynamic-red"
            >
              Write
            </Link>
            <Link
              href="/page/advertise"
              className="whitespace-nowrap hover:underline"
              activeClassName="font-semibold md:font-bold text-dynamic-red"
            >
              Advertise
            </Link>
            <LearnMenu />
          </nav>
        </div>
        <div className="hidden sm:block absolute inset-0 px-4 z-0">
          <div className="flex items-center justify-between h-full">
            <div className="-ml-2 social-icons flex items-center space-x-1 text-red-500">
              <SocialMedia />
            </div>
            <div className="actions flex items-center space-x-2">
              <button
                aria-label="Search Icon"
                disabled={disabled}
                onClick={openModal}
                className="ignore-onclickoutside focus:outline-none focus:ring-2 ring-dynamic-red focus:text-dynamic-red rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <UserLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
