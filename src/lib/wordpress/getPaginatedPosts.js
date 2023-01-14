import { GET_PAGINATED_POSTS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "./client";
import formatPostsArray from "@utils/formatPostsArray";

export default async function getPaginatedPosts({
  authorName = "",
  offset = 0,
  size = 1,
  tag = "",
  categoryDbId = null,
}) {
  const apolloClient = getApolloClient();

  const { data } = await apolloClient.query({
    query: GET_PAGINATED_POSTS,
    variables: {
      categoryDbId,
      authorName,
      offset,
      size,
      tag,
    },
  });
  if (!data?.posts?.nodes?.length ?? false) {
    return {
      posts: null,
      haveNextPage: false,
    };
  }
  return {
    posts: await formatPostsArray({ posts: data?.posts?.nodes ?? null }),
    haveNextPage: data?.posts?.pageInfo?.offsetPagination?.hasMore ?? false,
  };
}
