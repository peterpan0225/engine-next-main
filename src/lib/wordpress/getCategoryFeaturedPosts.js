import { getApolloClient } from "@lib/wordpress/client";
import formatPostsArray from "@utils/formatPostsArray";
import { GET_CAT_LATEST_POSTS } from "./graphqlQueries";
export default async function getCategoryFeaturedPosts({
  tagNotIn = "",
  first = 4,
  author = "",
  slug = "",
  categoryNotIn = "",
  categoryId = null,
}) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_CAT_LATEST_POSTS,
    variables: {
      author,
      slug,
      categoryNotIn,
      tagNotIn,
      first,
      categoryId,
    },
  });

  if (!data?.posts) {
    return null;
  }
  return await formatPostsArray({ posts: data?.posts?.nodes ?? null });
}
