import { QUERY_CATEGORY_DETAILS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "./client";
import getLatestPosts from "./getLatestPosts";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getCategoryDetails(slug) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: QUERY_CATEGORY_DETAILS,
    variables: {
      slug,
    },
  });
  if (!data?.category) {
    return false;
  }
  const postCount = data?.category?.posts?.pageInfo?.total ?? 0;

  return postCount
    ? {
        databaseId: data?.category?.databaseId,
        name: data?.category?.name,
        uri: data?.category?.uri,
        seo: data?.category?.seo,
        trendingPosts: await getLatestPosts({
          author: "",
          categoryNotIn: data?.category?.databaseId,
        }),
        totalPosts: data?.category?.posts?.pageInfo?.total ?? 0,
      }
    : false;
}

export default getCategoryDetails;
