import React from "react";
import classes from "./styles.module.css";

const ContactFormSection = () => {
  return (
    <div className="relative bg-white">
      <div className="lg:absolute lg:inset-0">
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover lg:absolute lg:h-full"
            src="/images/company.webp"
            alt="company"
          />
        </div>
      </div>
      <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
        <div className="lg:pr-8">
          <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
              Let's work together
            </h2>
            <p className="mt-4 text-lg leading-7 text-gray-500 sm:mt-3">
              We’d love to hear from you! To book advertising or enquire about a
              specific campaign or package please send us a message using the
              form opposite, or email us at advertising@dynamicbusiness.com.au
            </p>
            <form
              className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              action="#"
              method="POST"
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  for="first_name"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    className={`${classes.customInput} block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-600 rounded-md`}
                    id="first_name"
                    type="text"
                    name="first_name"
                    autocomplete="given-name"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  for="last_name"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    className={`${classes.customInput} block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md`}
                    id="last_name"
                    type="text"
                    name="last_name"
                    autocomplete="family-name"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    className={`${classes.customInput} block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md`}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  for="company"
                >
                  Company
                </label>
                <div className="mt-1">
                  <input
                    className={`${classes.customInput} block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md`}
                    id="company"
                    type="text"
                    name="company"
                    autocomplete="organization"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    for="phone"
                  >
                    Phone
                  </label>
                  <span
                    className="text-sm text-gray-500"
                    id="phone_description"
                  >
                    Optional
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    className={`${classes.customInput} block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md`}
                    id="phone"
                    type="text"
                    name="phone"
                    autocomplete="tel"
                    aria-describedby="phone_description"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    for="how_can_we_help"
                  >
                    How can we help you?
                  </label>
                  <span
                    className="text-sm text-gray-500"
                    id="how_can_we_help_description"
                  >
                    Max. 500 characters
                  </span>
                </div>
                <div className="mt-1">
                  <textarea
                    className={`${classes.customTextarea} block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md`}
                    id="how_can_we_help"
                    name="how_can_we_help"
                    aria-describedby="how_can_we_help_description"
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="block text-sm font-medium text-gray-700">
                  Expected budget
                </legend>
                <div className="mt-4 grid grid-cols-1 ">
                  <div className="flex items-center">
                    <input
                      className={`${classes.customInput} focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300`}
                      id="budget_under_1k"
                      name="budget"
                      value="under_1k"
                      type="radio"
                    />
                    <label className="ml-3" for="budget_under_25k">
                      <span className="block text-sm text-gray-700">
                        Less than $1,000
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      className={`${classes.customInput} focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300`}
                      id="budget_1k-5k"
                      name="budget"
                      value="1k-5k"
                      type="radio"
                    />
                    <label className="ml-3" for="budget_25k-50k">
                      <span className="block text-sm text-gray-700">
                        $1,000 – $5,000
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      className={`${classes.customInput} focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300`}
                      id="budget_5k-10k"
                      name="budget"
                      value="5k-10k"
                      type="radio"
                    />
                    <label className="ml-3" for="budget_50k-100k">
                      <span className="block text-sm text-gray-700">
                        $5,000 – $10,000
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      className={`${classes.customInput} focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300`}
                      id="budget_over_10k"
                      name="budget"
                      value="over_10k"
                      type="radio"
                    />
                    <label className="ml-3" for="budget_over_100k">
                      <span className="block text-sm text-gray-700">
                        $10,000+
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  for="how_did_you_hear_about_us"
                >
                  How did you hear about us?
                </label>
                <div className="mt-1">
                  <input
                    className={`${classes.customInput} shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                    id="how_did_you_hear_about_us"
                    type="text"
                    name="how_did_you_hear_about_us"
                  />
                </div>
              </div>
              <div className="text-left sm:col-span-2">
                <button
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
