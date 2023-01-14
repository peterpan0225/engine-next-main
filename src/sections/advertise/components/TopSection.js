import React from "react";
import Image from "next/image";
import useMediaKitModal from "../../../contexts/MediaKitModalContext";

const TopSection = () => {
  const { open, openModal, closeModal } = useMediaKitModal();
  return (
    <main className="lg:relative">
      <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-24 lg:text-left">
        <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h1 className="text-4xl mr-1 tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
            Reach 10000s of Businesses &amp; Entrepreneurs
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
            Dynamic Business is a specialist business publisher.{" "}
          </p>
          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl font-bold">
            Our mission is to help Small &amp; Medium Businesses to be
            successful and grow.
          </p>
          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
            {" "}
            We reach 30,000-60,000 business visitors per month and send ~40,000
            emails a week to our subscribers providing them a mix of business
            news, analysis and "how to" articles.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md">
              <button
                onClick={openModal}
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                href="#"
              >
                Request Media Kit
              </button>
            </div>

            <div className="rounded-md shadow"></div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"></div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/phone.webp"
          alt="girl-with-phone"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 968px) 100vw,
              50vw"
        />
      </div>
    </main>
  );
};

export default TopSection;
