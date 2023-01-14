import formatPostDate from "./formatPostDate";
export default function formatPostsArray({ posts = null }) {
  if (!posts) {
    return null;
  }
  return posts.map(({ categories, date, author, featuredImage, ...rest }) => {
    return {
      ...rest,
      category: categories?.nodes[0] ?? null,
      date: formatPostDate(date),
      author: author?.node,
      featuredImage: featuredImage?.node ?? null,
    };
  });
}
