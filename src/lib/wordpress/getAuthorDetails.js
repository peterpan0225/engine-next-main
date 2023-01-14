import { QUERY_AUTHOR_DETAILS } from "./graphqlQueries";
import { getApolloClient } from "./client";
import getLatestPosts from "./getLatestPosts";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getAuthorDetails({ slug }) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: QUERY_AUTHOR_DETAILS,
    variables: {
      slug,
    },
  });
  if (!data?.user) {
    return false;
  }
  const postCount = data?.user?.posts?.pageInfo?.total ?? 0;

  return postCount
    ? {
        id: data?.user?.id,
        databaseId: data?.user?.databaseId,
        name: data?.user?.name,
        description: data?.user?.description,
        seo: data?.user?.seo,
        trendingPosts: await getLatestPosts({ author: data?.user?.databaseId }),
        avatar:
          data?.user?.avatar?.url ?? `https://gravatar.com/avatar/?d=identicon`,
        totalPosts: data?.user?.posts?.pageInfo?.total ?? 0,
      }
    : false;
}

export default getAuthorDetails;
