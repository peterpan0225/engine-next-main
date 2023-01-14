import React from "react";
import { Menu } from "@headlessui/react";
import { SearchIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "./helperFns";
import useAuth from "../../contexts/AuthContext";
import Link from "next/link";
import Logo from "../header/Logo";

const DesktopSidebar = ({ userProfile, navigation }) => {
  const { signout } = useAuth();

  const isLoggedIn = !!userProfile;
  const user_meta_data = userProfile?.user_meta_data || {};
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
      <div className="flex items-center flex-shrink-0 px-[6px]">
        <Logo />
      </div>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="mt-1 h-0 flex-1 flex flex-col overflow-y-auto">
        {/* User account dropdown */}
        {isLoggedIn && (
          <Menu as="div" className="px-3 relative inline-block text-left">
            <div>
              <Menu.Button className="mt-1 group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                <span className="flex w-full justify-between items-center">
                  <span className="flex min-w-0 items-center justify-between space-x-3">
                    <img
                      className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                      src={user_meta_data.avatar_url}
                      alt="user avatar"
                    />
                    <span className="flex-1 flex flex-col min-w-0">
                      <span className="text-gray-900 text-sm font-medium truncate">
                        {user_meta_data.name}
                      </span>
                      <span className="text-gray-500 text-sm truncate">
                        {user_meta_data.email}
                      </span>
                    </span>
                  </span>
                  <SelectorIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
            </div>
          </Menu>
        )}
        {/* Sidebar Search */}
        {/* <div className="px-3 mt-5">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <SearchIcon
                className="mr-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
            />
          </div>
        </div> */}
        {/* Navigation */}
        <nav className="px-3 mt-6">
          <div className="space-y-1">
            {navigation.map((item) => {
              if (!isLoggedIn && item.requiresUser) {
                return <></>;
              }
              if (isLoggedIn && item.requiresNoUser) {
                return <></>;
              }
              return item.type === "button" ? (
                <span
                  key={item.name}
                  onClick={item.onClick}
                  className={classNames(
                    item.current
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </span>
              ) : (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
