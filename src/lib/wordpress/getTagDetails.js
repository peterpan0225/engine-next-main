import { QUERY_TAG_DETAILS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "./client";
import getLatestPosts from "./getLatestPosts";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getTagDetails(slug) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: QUERY_TAG_DETAILS,
    variables: {
      slug,
    },
  });
  if (!data?.tag) {
    return false;
  }
  const postCount = data?.tag?.posts?.pageInfo?.total ?? 0;

  return postCount
    ? {
        databaseId: data?.tag?.databaseId,
        name: data?.tag?.name,
        uri: data?.tag?.uri,
        seo: data?.tag?.seo,
        trendingPosts: await getLatestPosts({ author: "" }),
        totalPosts: data?.tag?.posts?.pageInfo?.total ?? 0,
      }
    : false;
}

export default getTagDetails;
