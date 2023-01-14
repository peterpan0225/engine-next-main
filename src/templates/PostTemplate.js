import BlogSeo from "@components/seo/BlogSeo";
import PostSection from "@sections/post/PostSection";

export default function PostTemplate({ postDetails = {} }) {
  return (
    <>
      <BlogSeo postDetails={postDetails} />
      <PostSection postDetails={postDetails} />
    </>
  );
}
