import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { useRouter } from "next/router";
import useSearchModal from "@contexts/SearchModalContext";

export default function SearchModal() {
  const router = useRouter();

  let completeButtonRef = useRef(null);
  const { open, closeModal } = useSearchModal();
  const [searchText, setSearchText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?name=${searchText}`);
  };
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          initialFocus={completeButtonRef}
          as="div"
          className="fixed inset-0 z-[300] overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center flex justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="absolute top-0 w-full max-w-[620px] text-left p-6 my-8 transition-all transform bg-white shadow-xl">
                <p className="font-bold text-3xl mb-4">Search</p>
                <div className="search-box-con">
                  <form
                    className="search-box flex shadow-md overflow-hidden"
                    onSubmit={handleSubmit}
                  >
                    <input
                      ref={completeButtonRef}
                      type="text"
                      placeholder="Enter your search keywords"
                      className="border w-full px-2 focus:outline-none focus:ring-2 ring-dynamic-red"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    {/* <Link
                    href={{
                      pathname: "/search",
                      query: { name: searchText },
                    }}
                  >
                    <a >
                      Search
                    </a>
                  </Link> */}
                    <input
                      type="submit"
                      className="hover:no-underline bg-black text-white px-4 md:px-6 py-2.5"
                      value="Search"
                    />
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
