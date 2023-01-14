import { getApolloClient } from "@lib/wordpress/client";
import formatPostsArray from "@utils/formatPostsArray";
import { GET_BRAND_POSTS } from "./graphqlQueries";
//import { GET_LATEST_POSTS } from "./graphqlQueries";
export default async function getLatestPosts() {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_BRAND_POSTS,
  });
  if (!data?.posts) {
    return null;
  }
  return await formatPostsArray({ posts: data?.posts?.nodes ?? null });
}
// export default async function getLatestPosts({
//   tagNotIn = "",
//   first = 4,
//   author = "",
//   slug = "",
//   categoryNotIn = "",
//   categoryId = null,
// }) {
//   const apolloClient = getApolloClient();
//   const { data } = await apolloClient.query({
//     query: GET_LATEST_POSTS,
//     variables: {
//       author,
//       slug,
//       categoryNotIn,
//       tagNotIn,
//       first,
//       categoryId,
//     },
//   });

//   if (!data?.posts) {
//     return null;
//   }
//   return await formatPostsArray({ posts: data?.posts?.nodes ?? null });
// }
