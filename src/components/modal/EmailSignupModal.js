import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import useAuth from "@contexts/AuthContext";
import useEmailSignupModal from "@contexts/EmailSignupModalContext";
import EmailSubscribeForm from "./EmailSubscribeForm";
import usePageView from "@contexts/PageViewContext";
import useGlobalConfig from "@contexts/GlobalSiteContext";
//import SidebarImage from "@reusables/SidebarImage";

export default function EmailSignupModal() {
  const { open, openModal, closeModal, modalInfo, setModalInfo } =
    useEmailSignupModal();
  const config = useGlobalConfig();
  const { siteConfigOptions, sidebarImage } = config || {};
  const { showMailchimpPopupIn } = siteConfigOptions || {};
  const { showImage, textBelowImage, imageUrl } = sidebarImage || {};
  let completeButtonRef = useRef(null);

  const { pageView } = usePageView();
  const { user } = useAuth();
  useEffect(() => {
    if (user) return;
    const modalShowed = modalInfo?.showed ?? false;
    const triggerValue = showMailchimpPopupIn ?? 4;
    if (pageView >= triggerValue && !modalShowed) {
      openModal();
      setModalInfo({
        showed: true,
        date: new Date(),
      });
    }
  }, [
    pageView,
    modalInfo,
    setModalInfo,
    openModal,
    user,
    showMailchimpPopupIn,
  ]);
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          initialFocus={completeButtonRef}
          as="div"
          className="fixed inset-0 z-[300] overflow-y-auto"
          onClose={closeModal}
        >
          {/* <button
            className="sr-only"
            ref={completeButtonRef}
            onClick={closeModal}
          /> */}
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-10" />
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
              <div className="relative inline-block w-full max-w-[420px] p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl border-t-8 min-h-[300px] border-dynamic-red rounded-b-none md:rounded-b-lg rounded-lg ">
                <div className="absolute  top-0 left-0  bg-white shadow-inner flex mt-[-48px] md:mt-4 ml-4 md:ml-[-40px] p-1 rounded-t-lg md:rounded-t-none md:rounded-l-lg">
                  <button
                    onClick={closeModal}
                    ref={completeButtonRef}
                    className="close-modal focus:outline-none"
                    aria-label="close login modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-3xl mb-4">
                Helping You Win at Business
                </p>
                <p className="font-bold mb-2">
                Get Tips, Business News & How to Articles Delivered Daily</p>
                  
                  <p>
                  Our mission is to help you get better at business
                  by helping you solve common problems like sales, marketing, finance and HR and by keeping 
                  you up to date with breaking business news, analysis and special offers.
                </p>
                {/* {showImage && (
                  <SidebarImage
                    imageUrl={imageUrl}
                    textBelowImage={textBelowImage}
                    popUp={true}
                  />
                )} */}
                <EmailSubscribeForm />
                <p className="font-light text-xs mt-2">PS You can unsubscribe anytime & we will never sell your data</p>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
