import React from "react";

const TrustedBySection = () => {
  return (
    <div className="bg-indigo-800">
      <div className="max-w-screen-xl mx-auto py-12 sm:py-16 sm:px-6 lg:px-8 lg:py-20 px-3">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
            Trusted by entrepreneurs &amp; business people across the globe
          </h2>
          <p className="mt-3 text-xl leading-7 text-indigo-200 sm:mt-4"></p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4">
          <div className="flex flex-col">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
              Visitors pm
            </dt>
            <dd className="order-1 text-5xl leading-none font-extrabold text-white">
              30-60k
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
              Contributors
            </dt>
            <dd className="order-1 text-5xl leading-none font-extrabold text-white">
              500+
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
              Email Subscribers
            </dt>
            <dd className="order-1 text-5xl leading-none font-extrabold text-white">
              9100
            </dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
              Social Followers
            </dt>
            <dd className="order-1 text-5xl leading-none font-extrabold text-white">
              30k
            </dd>
          </div>
        </dl>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl leading-9 text-white sm:text-3xl py-8 sm:leading-10">
            {" "}
            70% of our readers are SME business owners or management and employ
            from 2 to 20 people
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
