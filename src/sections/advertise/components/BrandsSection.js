import React from "react";
import Image from "next/image";
import useMediaKitModal from "../../../contexts/MediaKitModalContext";

const BrandsSection = () => {
  const { openModal } = useMediaKitModal();
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Top SaaS, Business Services & Tech companies use Dynamic Business
              to reach SME customers
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-7 text-gray-500">
              Used by top global and Australian companies
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <button
                  onClick={openModal}
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  href="#"
                >
                  Request Media Kit
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            <div className="relative col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <Image
                className="max-h-12"
                src="/images/iron-mountain.png"
                alt="brand"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <Image
                className="max-h-12"
                src="/images/oracle-netsuite.jpg"
                alt="brand"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <Image
                className="max-h-12"
                src="/images/sap-concur.jpg"
                alt="brand"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <Image
                className="max-h-12"
                src="/images/smartpay.svg"
                alt="brand"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <Image
                className="max-h-12"
                src="/images/employsure.png"
                alt="brand"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="relative col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <Image
                className="max-h-12"
                src="/images/metigy-AI.png"
                alt="brand"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
