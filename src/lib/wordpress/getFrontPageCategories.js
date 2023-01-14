import featch from "./fetch";
import formatPostsArray from "@utils/formatPostsArray";

async function getFrontPageCategories(first, after, exclude) {
  const data = await featch(
    `
    query MyQuery($after: String!, $first: Int!, $exclude: [ID]) {
      categories(first: $first, after: $after, where: {exclude: $exclude, hideEmpty: true}) {
        nodes {
            databaseId
          name
          uri
          posts(first: 3) {
            nodes {
              title
              id
              date
              excerpt
              uri
              author {
                node {
                  uri
                  name
                  avatar {
                    url
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM_LARGE)
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }    
    
        `,
    {
      variables: { first, after, exclude },
    }
  );
  return {
    ...data.categories,
    nodes: data.categories.nodes.map((cat) => {
      return {
        ...cat,
        posts: formatPostsArray({
          posts: cat?.posts?.nodes,
        }),
      };
    }),
  };
}
export default getFrontPageCategories;
