import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { classNames } from "./helperFns";
import {
  deleteComment,
  approveComment,
  banUser,
} from "../../utils/commentsActions";

export default function CommentsActions({
  comment,
  userProfile,
  setCommentsList,
}) {
  const { id, isPending, user_id } = comment;
  const {
    user_meta_data: { email },
  } = user_id || { user_meta_data: {} };
  const { user_role } = userProfile;

  const [loadingAction, setLoadingAction] = useState(false);
  if (user_role !== "admin") return <div></div>;

  const handleDeleteComment = async () => {
    try {
      setLoadingAction(true);
      const response = await deleteComment(id);
      if (!response.error && response.body.length > 0) {
        setCommentsList((oldVal) =>
          oldVal.filter((comment) => comment.id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAction(false);
    }
  };
  const handleApproveComment = async () => {
    try {
      setLoadingAction(true);
      const response = await approveComment(id);
      if (!response.error && response.body.length > 0) {
        setCommentsList((oldVal) =>
          oldVal.map((comment) =>
            comment.id === id ? { ...comment, isPending: false } : comment
          )
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAction(false);
    }
  };
  const handleBanUser = async () => {
    try {
      setLoadingAction(true);
      const response = await banUser(email);
      // if (!response.error && response.body.length > 0) {
      //   setCommentsList((oldVal) =>
      //     oldVal.map((comment) =>
      //       comment.user_id?.user_meta_data?.email === email
      //         ? { ...comment, isPending: false }
      //         : comment
      //     )
      //   );
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAction(false);
    }
  };

  return loadingAction ? (
    <div>
      <div
        className="m-auto w-6 h-6 rounded-full animate-spin
                    border border-solid border-red-500 border-t-transparent"
      ></div>
    </div>
  ) : (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={handleDeleteComment}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  Delete Comment
                </span>
              )}
            </Menu.Item>
            {isPending && (
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={handleApproveComment}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    Approve Comment
                  </span>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={handleBanUser}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  Ban User
                </span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
