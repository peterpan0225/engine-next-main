import { QUERY_POST_DETAILS_BY_URL } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "@lib/wordpress/client";
import formatPostDate from "@utils/formatPostDate";
import getLatestPosts from "./getLatestPosts";
const apolloClient = getApolloClient();

async function GetPostDetailsBySlug({ slug = "" }) {
  const { data } = await apolloClient.query({
    query: QUERY_POST_DETAILS_BY_URL,
    variables: {
      slug,
    },
  });
  return await formatePostDetails(data.posts);
}

export default GetPostDetailsBySlug;

const formatePostDetails = async (postDetails) => {
  const postExist = postDetails?.nodes?.length ?? false;
  if (!postExist) return null;
  const postNode = postDetails.nodes[0];
  return {
    id: postNode.id,
    databaseId: postNode.databaseId,
    title: postNode.title,
    content: postNode.content,
    excerpt: postNode.excerpt,
    uri: postNode.uri,
    date: postNode.date,
    modified: postNode.modified,
    dateFormated: formatPostDate(postNode.date),
    modifiedFormated: formatPostDate(postNode.modified),
    categories: postNode.categories?.nodes,
    tags: postNode.tags?.nodes,
    author: postNode.author?.node,
    featuredImage: postNode?.featuredImage?.node ?? null,
    seo: postNode?.seo ?? null,
    nextPostUri: postNode?.nextpageUrl,
    trendingPosts: await getLatestPosts({ slug: postNode.databaseId }),
  };
};
