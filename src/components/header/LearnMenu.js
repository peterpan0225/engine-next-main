import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "@reusables/NavLink";

export default function LearnMenu() {
  return (
    <Popover className="relative">
      <Popover.Button className="uppercase whitespace-nowrap px-1 focus:outline-none focus:ring-2 ring-dynamic-red rounded focus:text-dynamic-red">
        LEARN
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="fixed md:absolute w-full bg-white border-t inset-x-0 md:left-auto md:right-auto md:w-screen md:max-w-md md:-ml-52 lg:-ml-32 mt-2 md:mt-3 shadow-lg">
          <div className="dropdown p-4">
            <div className="flex space-x-8">
              <div className="category-menu">
                <p className="font-semibold text-lg sm:text-xl">CATEGORIES</p>
                <div className="flex space-x-8">
                  <nav className="nav flex space-x-8 mt-4">
                    <div className="one flex flex-col space-y-1">
                      <Link
                        href="/category/leadership-2/entrepreneur-profile/entrepreneur-advice"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Advice
                      </Link>
                      <Link
                        href="/category/topics/small-business-resources/accounting-tax-time"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Accounting
                      </Link>
                      <Link
                        href="/category/topics/finance"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Finance
                      </Link>
                      <Link
                        href="/category/topics/finance/funding-and-investment"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Funding
                      </Link>
                      <Link
                        href="/category/topics/small-business-resources/growth-import-export"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Growth/Export
                      </Link>
                    </div>
                  </nav>

                  <nav className="nav flex space-x-8 mt-4">
                    <div className="one flex flex-col space-y-1">
                      <Link
                        href="/category/topics/workplace/human-resources-blogs"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        HR
                      </Link>
                      <Link
                        href="/category/topics/small-business-resources/sales-blogs"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Sales
                      </Link>
                      <Link
                        href="/category/topics/small-business-resources/advertising-and-marketing"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Advertising/Marketing
                      </Link>
                      <Link
                        href="/category/topics/finance/finance-cash-flow"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Cashflow
                      </Link>
                      <Link
                        href="/category/topics/technology/e-commerce-2"
                        className="whitespace-nowrap hover:underline normal-case"
                        activeClassName="font-semibold text-dynamic-red"
                      >
                        Ecommerce
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
