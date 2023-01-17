import PostTemplate from "@templates/PostTemplate";
import checkIfPostExists from "@lib/wordpress/checkIfPostExists";
import GetPostDetailsBySlug from "@lib/wordpress/getPostDetailsBySlug";
import sanitizeSlug from "@utils/sanitizeSlug";
import logPageBuild from "@utils/logPageBuild";
import BuildInfo from "@reusables/BuildInfo";

// export const config = {
//   unstable_runtimeJS: false,
// };
export default function BlogPage({ postDetails, time, timeTook }) {
  return (
    <BuildInfo time={time} timeTook={timeTook}>
      <PostTemplate postDetails={postDetails} />
    </BuildInfo>
  );
}

export async function getStaticProps({ params: { slug: slugArray } }) {
  let executionStart = new Date();
  //sanitize the slug array and remove and comma and apostrophe
  const slug = await sanitizeSlug(slugArray);
  //Check if the url is a feed page and redirects them to the main page.

  //Handel all posts routes below
  //Get the post slug, last item of the slug array
  //check if its contain .html in the slug if tru remove it and crete the query slug
  const postSlug = slug[slug.length - 1];
  const containHtml = postSlug.includes(".html");
  const querySlug = containHtml ? postSlug.slice(0, -5) : postSlug;

  //Checking if post is exist in db if not returning 404 page
  const postExist = await checkIfPostExists(querySlug);
  if (!postExist) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }
  //Check if the requested post url is same as db url if not redirect to the correct url
  const asDbUri = `/${slug.join("/")}`;
  const sameURL = asDbUri === postExist?.uri;
  if (!sameURL) {
    return {
      redirect: {
        destination: postExist?.uri,
        permanent: true,
      },
    };
  }

  //Get post details by Slug
  const postDetails = await GetPostDetailsBySlug({ slug: querySlug });
  // 404 if no postDetails
  if (!postDetails) {
    console.log({ slugContentNotFound: querySlug });
    return {
      notFound: true,
      revalidate: 5,
    };
  }
  //console.log page build with time;
  let executionEnd = new Date() - executionStart;
  logPageBuild({
    url: slug.join("/"),
    timeTook: executionEnd,
    type: "generating",
  });
  const data = {
    postDetails,
    postType: "post",
    timeTook: executionEnd,
    time: executionStart.toString(),
    key: slug.join("-"),
  };

  return {
    props: data, // will be passed to the page component as props
    revalidate: 86400, // In seconds
  };
}
export async function getStaticPaths() {
  // const counts = await getTotalCounts();
  // // logs the counts of all categories, posts and tags
  // console.log({ counts });
  // const postsCount = counts.getTotalPosts;
  // const PerPage = 1000;
  // // Get number of pages
  // const totalPages = Math.floor(parseInt(postsCount) / PerPage);
  // console.log({ totalPages });
  // let allPostsURLS = [];
  // for (let i in [...Array(totalPages)]) {
  //   const pageNumber = parseInt(i) + 1;
  //   console.log({ pageNumber });
  //   const postUrls =
  //     (await getPostsSitemap({ perPage: PerPage, pageNo: pageNumber })) || [];
  //   allPostsURLS = [...allPostsURLS, ...postUrls];
  //   if (allPostsURLS.length >= 5000) break;
  // }
  // console.log({ AllPostsLength: allPostsURLS.length });
  // allPostsURLS = [...new Set(allPostsURLS)];
  // console.log({ AllUniquePostsLength: allPostsURLS.length });

  // const UrlsArray = allPostsURLS?.map((Url) => Url?.split("/").slice(1));
  // const paths = UrlsArray?.map((uriArray) => ({
  //   params: { slug: uriArray },
  // }));
  return {
    paths: [],
    fallback: "blocking",
  };
}
