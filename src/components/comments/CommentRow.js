import React from "react";
import CommentsActions from "./CommentsActions";
import Link from "next/link";

const CommentRow = ({ comment = {}, userProfile, setCommentsList }) => {
  const isAdmin = userProfile?.user_role === "admin";
  return (
    <tr key={comment.id}>
      <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex items-center space-x-3 lg:pl-2">
          <a href="#" className="truncate hover:text-gray-600">
            <span>{comment.data}</span>
          </a>
        </div>
      </td>
      <td className="px-6 py-3 max-w-0 whitespace-nowrap text-sm text-gray-500 font-medium">
        <div className="flex items-center space-x-2">
          <Link href={comment.story_uri || "#"}>
            <a className="truncate hover:text-gray-600">
              {comment.postDetails?.title}
            </a>
          </Link>
        </div>
      </td>
      <td
        data-tip={comment.id}
        className="hidden max-w-0 md:table-cell px-3 py-3 whitespace-nowrap text-sm text-gray-500	truncate overflow-hidden cursor-pointer"
      >
        <span>{comment.user_id?.user_meta_data?.name}</span>
      </td>
      {isAdmin && (
        <td className="hidden max-w-0 md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 ">
          <span
            className={`${
              comment.isPending
                ? "bg-blue-200 text-blue-600"
                : "bg-green-200 text-green-600"
            } rounded-xl font-semibold	px-2 py-1`}
          >
            {comment.isPending ? "Pending" : "Active"}
          </span>
        </td>
      )}
      {isAdmin && (
        <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
          <CommentsActions
            comment={comment}
            userProfile={userProfile}
            setCommentsList={setCommentsList}
          />
        </td>
      )}
    </tr>
  );
};

export default CommentRow;
