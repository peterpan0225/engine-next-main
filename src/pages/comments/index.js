import React, { useEffect, useMemo, useState } from "react";
import CommentsTemplate from "../../components/comments/CommentsTemplate";
import { supabase } from "../../lib/supabaseClient";
import GetPostDetailsBySlug from "@lib/wordpress/getPostDetailsBySlug";
import useAuth from "../../contexts/AuthContext";
import { useRouter } from "next/router";

const CommentsPage = ({ userProfile, comments }) => {
  const router = useRouter();
  const { isLoggedIn, loadingUser, user } = useAuth();
  const [userProfileFromClient, setUserProfileFromClient] = useState(null);

  useEffect(() => {
    if (user && !userProfile) {
      const getUserProfile = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setUserProfileFromClient(data);
        }
      };
      getUserProfile();
    }
  }, [user]);
  // for logging out
  useEffect(() => {
    if (!isLoggedIn && !loadingUser) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const userProfileValue = userProfile || userProfileFromClient;
  const isAdmin = userProfileValue?.user_role === "admin";

  const displayedComments = isAdmin
    ? comments.filter(({ isPending }) => isPending)
    : comments;

  return (
    <CommentsTemplate
      userProfile={userProfileValue}
      comments={displayedComments}
    />
  );
};

export default CommentsPage;

export const getServerSideProps = async ({ req }) => {
  try {
    // -- User --
    const { token, user, data, error } =
      (await supabase.auth.api.getUserByCookie(req)) || {};
    console.log({ user, token, data, error });

    let userProfile = null;
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      userProfile = data || null;
    }

    // -- Comments --
    const { data: comments = [] } = await supabase
      .from("user_meta")
      .select("*, user_id(*)")
      .order("created_at", { ascending: false });

    // Getting the slug of the comment's story
    const postsURIs = [
      ...new Set(comments.map((comment) => comment.story_uri)),
    ];
    const postsSlug = postsURIs.map((uri) => {
      const uriArr = uri.split("/");
      return uriArr[uriArr.length - 1].slice(0, -5);
    });

    let storiesReqs = [];
    postsSlug.forEach((querySlug) =>
      storiesReqs.push(GetPostDetailsBySlug({ slug: querySlug }))
    );

    const postsDetails = await Promise.all(storiesReqs);
    // Add the postDetails to the comments Object
    const commentsWithStoryDetails = comments.map((comment) => {
      const commentStoryDetails = postsDetails.find(
        (postDetails) => postDetails?.id === comment.story_id
      );
      return {
        ...comment,
        postDetails: commentStoryDetails,
      };
    });
    return {
      props: {
        userProfile,
        comments: JSON.parse(JSON.stringify(commentsWithStoryDetails)),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
