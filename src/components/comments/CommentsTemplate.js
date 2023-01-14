import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  LogoutIcon,
  LoginIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import { classNames } from "./helperFns";
import useAuth from "../../contexts/AuthContext";
import CommentRow from "./CommentRow";
import ReactTooltip from "react-tooltip";
import Image from "next/image";

export default function CommentsTemplate({ userProfile, comments }) {
  const { signout, signinWithGoogle } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: "Comments",
      href: "#",
      icon: ViewListIcon,
      current: true,
    },
    {
      name: "Sign In",
      type: "button",
      onClick: signinWithGoogle,
      icon: LoginIcon,
      current: false,
      requiresNoUser: true,
    },
    {
      name: "Sign Out",
      type: "button",
      onClick: signout,
      icon: LogoutIcon,
      current: false,
      requiresUser: true,
    },
  ];

  const user_role = userProfile?.user_role;
  const isAdmin = user_role === "admin";

  return (
    <>
      <div className="min-h-full">
        {/* Mobile Sidebar */}
        <MobileSidebar
          navigation={navigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Static sidebar for desktop */}
        <DesktopSidebar navigation={navigation} userProfile={userProfile} />
        {/* Main column */}
        <div className="lg:pl-64 flex flex-col">
          {/* header for mobile  */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8"></div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold leading-6 text-gray-900 sm:truncate">
                  DB Community Comments
                </h1>
              </div>
            </div>

            {/* Comments list (only on smallest breakpoint) */}

            {/* Projects table (small breakpoint and up) */}
            <div className="mt-8 sm:block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th className="w-4/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span className="lg:pl-2">Comment</span>
                      </th>
                      <th className="w-4/12 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Story Name
                      </th>
                      <th className="w-2/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commenter
                      </th>
                      {isAdmin && (
                        <th className="w-2/12 hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      )}
                      {isAdmin && (
                        <th className="w-1/12 table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      )}
                      {/* <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" /> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {commentsList.map((comment) => (
                      <CommentRow
                        key={comment?.id}
                        setCommentsList={setCommentsList}
                        userProfile={userProfile}
                        comment={comment}
                      />
                    ))}
                    <ReactTooltip
                      effect="solid"
                      place="bottom"
                      border={true}
                      offset={{ left: 60 }}
                      delayHide={100}
                      delayShow={500}
                      delayUpdate={500}
                      clickable={true}
                      getContent={(dataTip) => {
                        // const user = c;
                        const comment =
                          commentsList.find(
                            (comment) => comment.id === parseInt(dataTip)
                          ) || {};
                        return (
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <Image
                                className="rounded-full"
                                src={
                                  comment.user_id?.user_meta_data?.avatar_url
                                }
                                width={40}
                                height={40}
                                alt="user image"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-200 truncate dark:text-white">
                                {comment.user_id?.user_meta_data?.full_name}
                              </p>

                              <p className="mt-3">Bio:</p>
                              <p className="">{comment.user_id?.bio}</p>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
