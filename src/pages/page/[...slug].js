import Head from "next/head";
import redirectIfFeedPage from "@utils/redirectIfFeedPage";
import getPageDetails from "@lib/wordpress/getPageDetails";
import PageTemplate from "@templates/PageTemplate";
import sanitizeSlug from "@utils/sanitizeSlug";
import logPageBuild from "@utils/logPageBuild";
import BuildInfo from "@reusables/BuildInfo";

export default function Page({ pageDetails, time, timeTook, slug }) {
  return (
    <BuildInfo time={time} timeTook={timeTook}>
      <Head>
        <link
          rel="canonical"
          href={`https://dynamicbusiness.com/page/${slug}`}
        />
      </Head>
      <PageTemplate pageDetails={pageDetails} />
    </BuildInfo>
  );
}

export async function getStaticProps({ params: { slug: slugArray } }) {
  let executionStart = new Date();
  //sanitize the slug array and remove and comma and apostrophe
  const slug = await sanitizeSlug(slugArray);
  //Check if the url is a feed page and redirects them to the main page.
  //This is necessery to follow the Wordpress url structure for posts as static page dont support xml page.
  const feedPage = slug[slug.length - 1] === "feed";
  if (feedPage) return redirectIfFeedPage({ slugArray: slug });

  //Check if this is a page and if so render page template
  const pageDetails = await getPageDetails(slug.join("/"));
  if (!pageDetails) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }

  let executionEnd = new Date() - executionStart;
  logPageBuild({ url: slug.join("/"), timeTook: executionEnd });
  return {
    props: {
      pageDetails,
      timeTook: executionEnd,
      time: executionStart.toString(),
      postType: "page",
      key: slug.join("-"),
      slug: slug.join("/"),
    }, // will be passed to the page component as props
    revalidate: 1200, // In seconds
  };
}
export async function getStaticPaths() {
  //This is returning empty pats array as this page will handel all the posts and pages route
  return {
    paths: [],
    fallback: "blocking",
  };
}
