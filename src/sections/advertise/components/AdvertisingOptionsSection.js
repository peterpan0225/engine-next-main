import React from "react";
import Image from "next/image";
import useMediaKitModal from "../../../contexts/MediaKitModalContext";

const AdvertisingOptionsSection = () => {
  const { openModal } = useMediaKitModal();
  return (
    <div className="relative bg-white">
      <div className="bg-indigo-600 relative w-full h-56 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:h-full">
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/table.webp"
          alt="girl-with-phone"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 968px) 100vw,
              50vw"
        />
      </div>
      <div className="relative max-w-screen-xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
        <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
          <div></div>
          <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Advertising Options
          </h2>
          <p className="mt-6 text-lg leading-7 text-gray-500"></p>
          <ul className="list-disc list-inside">
            <li>Solus - EDM</li>
            <li>DB Brand Accounts</li>
            <li>DB Workflows</li>
            <li>Sponsored Interviews</li>
            <li>Newsletter Sponsorship</li>
            <li>Feature Sponsorships</li>
            <li>Webcasts/Podcasts</li>
            <li>Banner Advertising</li>
          </ul>
          <div className="mt-8 overflow-hidden">
            <div onClick={openModal} className="rounded-md shadow">
              <button
                className="w-[200px] flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                href="#"
              >
                Request Media Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingOptionsSection;
