import { getApolloClient } from "@lib/wordpress/client";
import formatPostsArray from "@utils/formatPostsArray";
import { GET_HOMEPAGE_SLIDER_POSTS } from "./graphqlQueries";
export default async function getHomePageSlider({ categoryId = null }) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_HOMEPAGE_SLIDER_POSTS,
    variables: {
      categoryId,
    },
  });

  if (!data?.posts) {
    return null;
  }
  return await formatPostsArray({ posts: data?.posts?.nodes ?? null });
}
