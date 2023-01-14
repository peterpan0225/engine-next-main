import { useEffect, useMemo, useState } from "react";
import useModal from "@contexts/LoginModalContext";
import {
  commentOnPost,
  getToxicityScore,
  sendCommenterEmailToZapier,
  sendCommentSlackMessage,
} from "../utils/commentsActions";
import useAuth from "../contexts/AuthContext";
import Image from "next/image";
import useComments from "@contexts/CommentsContext";
import PostLoader from "../reusables/PostLoader";
import { modalModes } from "../CONSTANTS";

const CommentsList = ({
  postId,
  postURI,
  limit = undefined,
  showPostComment = true,
}) => {
  const { user } = useAuth();
  const { comments, setComments, loadingComments } = useComments();
  const displayedComments = useMemo(
    () =>
      comments.filter((commentObj) => {
        return user
          ? !commentObj?.comment?.isPending ||
              commentObj?.comment?.user_id === user.id
          : !commentObj?.isPending;
      }),
    [comments, user]
  );
  // opens the registration modal
  const { openModal, setMode } = useModal();

  const [newComment, setNewComment] = useState("");

  // set the newComment to the one in LS if exists
  useEffect(() => {
    const localStorageComment = JSON.parse(
      localStorage.getItem("currentComment")
    );
    if (localStorageComment && localStorageComment.postId === postId) {
      setNewComment(localStorageComment.commentBody);
      window.localStorage.removeItem("currentComment");
    }
  }, []);

  // every time the comment changes, we set it to ls with the story id
  useEffect(() => {
    if (newComment?.trim()) {
      const localStorageCommentObj = {
        commentBody: newComment,
        postId,
      };
      localStorage.setItem(
        "currentComment",
        JSON.stringify(localStorageCommentObj)
      );
    }
  }, [newComment]);

  const [loadingAddingComment, setLoadingAddingComment] = useState(false);
  const [toxicityInfo, setToxicityInfo] = useState({
    isToxic: false,
    score: null,
  });

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setLoadingAddingComment(true);
        // check for toxicity
        const toxicityScore = await getToxicityScore(newComment);
        if (toxicityScore && toxicityScore < 0.3) {
          const { data = [], error } =
            (await commentOnPost(
              postId,
              postURI,
              user.id,
              user.email,
              newComment
            )) || {};
          if (!error && data[0]) {
            const addedComment = {
              comment: data[0],
              user: { id: null, user_meta_data: user.user_metadata },
            };
            setComments((oldValue) => [addedComment, ...oldValue]);
            setNewComment("");
            setToxicityInfo(null);
            const slackRes = await sendCommentSlackMessage(addedComment);
            const zapierRes = await sendCommenterEmailToZapier(addedComment);
          }
          setLoadingAddingComment(false);
          window.localStorage.removeItem("currentComment");
        } else {
          setToxicityInfo({ isToxic: true, score: toxicityScore });
        }
      } else {
        setMode(modalModes.comments.name);
        openModal();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAddingComment(false);
    }
  };

  if (loadingComments) {
    return <PostLoader full />;
  }

  return (
    <div className="bg-[#D2EDFE] rounded-lg p-[25px] dark:bg-gray-800 ">
      <h2 className="text-xl mb-4 font-semibold ">What do you think?</h2>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {displayedComments.length ? (
            displayedComments.slice(0, limit).map((comm) => {
              const { comment, user } = comm;
              const commentDate = new Date(comment.created_at).toDateString();
              const { user_meta_data } = user || {};
              return (
                <li key={comment.id} className="py-3 sm:py-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={user_meta_data?.avatar_url}
                        width={40}
                        height={40}
                        alt="user image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user_meta_data?.full_name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {/* {user_meta_data.email} */}
                        {commentDate}
                      </p>
                      <p className="mt-1">{comment?.data}</p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <h4 className="mb-6 text-medium font-medium">
              Be the first to comment
            </h4>
          )}
        </ul>
      </div>
      {/*  */}
      {showPostComment && (
        <div className="flex items-center justify-left ">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#D2EDFE] rounded-lg pt-2"
          >
            <div className="flex flex-wrap -mx-3 ">
              <h4 className="px-4 pt-3 pb-2 text-gray-800 text-lg font-semibold">
                Add a new comment
              </h4>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  onChange={handleChange}
                  value={newComment}
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  required
                ></textarea>
                {toxicityInfo?.isToxic && (
                  <p className="text-dynamic-red">
                    Thanks for your comment, our aim is to provide a forum that
                    supports a diversity of views without abusive, spammy or
                    toxic comments. Please be respectful to each other and the
                    writers. We use{" "}
                    <a
                      className="text-blue-700"
                      href="https://perspectiveapi.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      perspectiveapi.com
                    </a>{" "}
                    powered by Google to avoid abusive or toxic comments. Your
                    draft comment has a score of{" "}
                    {toxicityInfo?.score?.toFixed(2)} and is failing
                  </p>
                )}
              </div>
              <div className="w-full md:w-full flex items-start justify-end md:w-full px-3">
                <div className="-mr-1">
                  <button
                    type="submit"
                    disabled={loadingAddingComment}
                    className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  >
                    {loadingAddingComment ? (
                      <div className="flex  mx-8 w-6 h-6 border-2 border-t-transparent border-red-600 border-solid rounded-full animate-spin"></div>
                    ) : (
                      "Post Comment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {/*  */}
    </div>
  );
};

export default CommentsList;
