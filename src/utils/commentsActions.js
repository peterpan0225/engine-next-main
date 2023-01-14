import axios from "axios";
import { supabase } from "../lib/supabaseClient";

const getStoryComments = async (storyId) => {
  const { data: comments, error } = await supabase
    .from("user_meta")
    .select("*")
    .eq("type", "comment")
    .eq("story_id", storyId)
    // .eq("isPending", false)
    .order("id", { ascending: false });

  // Get users for each comment
  const { data: users } = comments ? await getCommentsUsers(comments) : [];
  // make an array of objs with comment and user
  const arr = comments.map((comment) => {
    return {
      comment,
      user: users?.find((user) => user.id === comment.user_id) || {},
    };
  });

  return arr;
};
const getCommentsUsers = async (comments = []) => {
  const usersIds = [...new Set(comments.map((comment) => comment.user_id))];
  const usersResponse = await supabase
    .from("profiles")
    .select("*")
    .in("id", usersIds);

  return usersResponse;
};

const isBannedUser = async (email) => {
  if (!email) return;
  let isBanned = false;
  const response = await supabase
    .from("banned_users")
    .select("*")
    .eq("email", email);
  if (response.data.length > 0) {
    isBanned = true;
  }
  return isBanned;
};
const commentOnPost = async (storyId, postURI, userId, email, commentBody) => {
  if (storyId && userId && commentBody) {
    const isBanned = await isBannedUser(email);
    if (isBanned) return;
    const response = await supabase.from("user_meta").insert([
      {
        user_id: userId,
        type: "comment",
        data: commentBody,
        story_id: storyId,
        story_uri: postURI,
      },
    ]);
    return response;
  } else {
    return;
  }
};
const sendCommentSlackMessage = async (comment) => {
  const { data } = await axios.post("/api/slack/comment", {
    comment: comment?.comment,
  });

  return data;
};
const sendCommenterEmailToZapier = async (comment) => {
  const { data } = await axios.post("/api/zapier/comment", {
    user: comment?.user,
  });
  return data;
};

const getToxicityScore = async (text) => {
  const { data } = await axios.post(`/api/toxicity-check`, {
    text,
  });
  const toxicityScore = data?.attributeScores?.TOXICITY?.summaryScore?.value;
  return toxicityScore;
};

const deleteComment = async (commentId) => {
  if (!commentId) return;
  const response = await supabase
    .from("user_meta")
    .delete()
    .match({ id: parseInt(commentId) });
  return response;
};

const approveComment = async (commentId) => {
  if (!commentId) return;
  const response = await supabase
    .from("user_meta")
    .update({ isPending: false })
    .match({ id: parseInt(commentId) });
  return response;
};
const banUser = async (email) => {
  if (!email) return;
  const response = await supabase.from("banned_users").insert([{ email }]);
  return response;
};
export {
  getStoryComments,
  commentOnPost,
  deleteComment,
  approveComment,
  banUser,
  getToxicityScore,
  sendCommentSlackMessage,
  sendCommenterEmailToZapier,
};
