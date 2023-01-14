import { GET_POST_BY_CATEGORY } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "./client";
import formatPostsArray from "@utils/formatPostsArray";
//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getPostsByCategory({ slug }) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_POST_BY_CATEGORY,
    variables: {
      slug,
    },
  });
  if (!data?.category) {
    return null;
  }

  return {
    ...data?.category,
    posts: await formatPostsArray({
      posts: data?.category?.posts?.nodes,
    }),
  };
}

export default getPostsByCategory;
