import { getApolloClient } from "@lib/wordpress/client";
import formatPostsArray from "@utils/formatPostsArray";
import { GET_SEARCH_POSTS } from "./graphqlQueries";

export default async function getSearchPosts({ query = "" }) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_SEARCH_POSTS,
    variables: {
      query,
    },
  });

  if (!data?.posts) {
    return null;
  }
  return await formatPostsArray({ posts: data?.posts?.nodes ?? null });
}
