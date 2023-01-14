import useModal from "@contexts/LoginModalContext";
import useSearchModal from "@contexts/SearchModalContext";
import Link from "@reusables/NavLink";
export default function MobileNavigation() {
  const { openModal } = useModal();
  const { openModal: openSModal, disabled } = useSearchModal();
  return (
    <div className="fixed bottom-0 bg-white w-full z-50 sm:hidden shadow-top">
      <div className="flex w-full justify-between items-center px-4">
        <Link href="/" className="p-2" activeClassName="text-dynamic-red">
          <div className="sr-only">Home Button</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-7 h-7"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
        <button
          onClick={openSModal}
          disabled={disabled}
          className="ignore-onclickoutside"
        >
          <div className="sr-only">Search Button</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-7 h-7"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <Link href="/">
          <div className="sr-only">Bookmark Button</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </Link>

        <button onClick={openModal}>
          <div className="sr-only">User Button</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
