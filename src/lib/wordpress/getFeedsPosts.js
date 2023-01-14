import { GET_FEEDS_POSTS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "./client";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
const apolloClient = getApolloClient();

async function getFeedsPosts() {
  const { data } = await apolloClient.query({
    query: GET_FEEDS_POSTS,
  });
  if (!data?.posts) {
    return null;
  }
  return data?.posts?.nodes ?? null;
}

export default getFeedsPosts;
