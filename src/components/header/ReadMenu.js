import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "@reusables/NavLink";

export default function ReadMenu() {
  return (
    <Popover className="relative">
      <Popover.Button className="uppercase whitespace-nowrap px-1 focus:outline-none focus:ring-2 ring-dynamic-red rounded focus:text-dynamic-red">
        READ
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
        <Popover.Panel className="fixed md:absolute w-full bg-white border-t inset-x-0 md:left-auto md:right-auto md:w-screen md:max-w-lg md:-ml-32 mt-2 md:mt-3 shadow-lg">
          <div className="dropdown p-4">
            <div className="flex space-x-8">
              <div className="category-menu">
                <p className="font-semibold text-xl">CATEGORIES</p>
                <nav className="nav flex space-x-8 mt-4">
                  <div className="one flex flex-col space-y-1">
                    <Link
                      href="/category/topics/news"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      News
                    </Link>
                    <Link
                      href="/category/leadership-2/entrepreneur-profile"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      Entrepreneur
                    </Link>
                    <Link
                      href="/category/topics/start-up-entrepreneur"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      Start-up
                    </Link>
                    <Link
                      href="/category/topics/small-business-resources"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      Small Business
                    </Link>
                    <Link
                      href="/category/leadership-2/expert"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      Expert
                    </Link>
                    <Link
                      href="/category/topics/technology"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      Tech
                    </Link>
                    <Link
                      href="/category/topics/small-business-resources/industry"
                      className="whitespace-nowrap hover:underline normal-case"
                      activeClassName="font-semibold text-dynamic-red"
                    >
                      Industry
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
