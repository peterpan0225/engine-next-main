import sanitizeSlug from "@utils/sanitizeSlug";
import redirectIfFeedPage from "@utils/redirectIfFeedPage";
import redirectToMainSlug from "@utils/redirectToMainSlug";
import getSlug from "@utils/getSlug";
import Layout from "@components/Layout";
import logPageBuild from "@utils/logPageBuild";
import getTagDetails from "@lib/wordpress/getTagDetails";
import getPaginatedPosts from "@lib/wordpress/getPaginatedPosts";
import TagSection from "@sections/tag/TagSection";
import getArchivesPageTtitle from "@utils/getArchivesPageTtitle";
import ArchiveSeo from "@components/seo/ArchiveSeo";
import MasterheadAd from "@components/ads/MasterheadAd";
import getTagSitemap from "../../lib/wordpress/sitemap/getTagSitemap";

export default function TagPage({ tagPageDetails }) {
  const { name } = tagPageDetails || {};
  return (
    <Layout>
      <ArchiveSeo pageDetails={tagPageDetails} />
      <header>
        <div className="container mx-auto px-4 ">
          <h1 className="text-3xl md:text-4xl font-bold my-4 sm:my-6 lg:my-8">
            Tag: {name.replace(/\b\w/g, (l) => l.toUpperCase())}
          </h1>
        </div>
      </header>
      <MasterheadAd ID="tag_page_master_ad" />
      <TagSection tagPageDetails={tagPageDetails} />
    </Layout>
  );
}
export async function getStaticProps({ params: { slug: slugArray } }) {
  let executionStart = new Date();
  //sanitize the slug array and remove and comma and apostrophe
  const slug = await sanitizeSlug(slugArray);
  //Check if the url is a feed page and redirects them to the main page.
  //This is necessery to follow the Wordpress url structure for posts as static page dont support xml page.

  //Check if this is a paginated author page and get the page number
  // If the pagination page is "1" redirect to the main slug
  const paginated = slug.includes("page");
  const pageNumber = slug[slug.length - 1];
  if (paginated && pageNumber === "1") {
    return redirectToMainSlug({ base: "tag", slugArray: slug });
  }

  //Get author name from slug array and check if user exit otherwise set 404
  const tagName = getSlug(pageNumber, slug, paginated);
  const tagDetails = await getTagDetails(tagName);
  if (!tagDetails) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }
  //Parse the page number to a INT
  // Set par page post amount in size and offset amount
  const pageNumInt = !isNaN(pageNumber) ? parseInt(pageNumber) : 1;
  const size = 10;
  const offset = Math.abs(size * (pageNumInt - 1));
  //Check how many nested page a author can have based on total posts and per page post size
  //If `pageNumInt` is more than the `maxPossiblePages` then return a 404 page no need to move forward
  const maxPossiblePages = Math.ceil(tagDetails.totalPosts / size);
  if (pageNumInt > maxPossiblePages) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }
  //Get author details along with post for this page
  const tagPosts = await getPaginatedPosts({ tag: tagName, offset, size });
  const tagPageDetails = {
    ...tagDetails,
    totalPages: maxPossiblePages,
    pageNo: pageNumInt,
    seoTitle: getArchivesPageTtitle({
      pageDetails: tagDetails,
      totalPages: maxPossiblePages,
      currentPage: pageNumInt,
    }),
    pageUrl: `/tag/${slug.join("/")}`,
    nextPageUrl: `/tag/${tagName}/page/${pageNumInt + 1}`,
    prevPageUrl: `/tag/${tagName}/page/${pageNumInt - 1}`,
    posts: tagPosts.posts,
    haveNextPage: tagPosts.haveNextPage,
  };
  let executionEnd = new Date() - executionStart;
  logPageBuild({ url: `/tag/${slug.join("/")}`, timeTook: executionEnd });
  return {
    props: { tagPageDetails, key: slug.join("-") }, // will be passed to the page component as props
    revalidate: 1200, // In seconds
  };
}
export async function getStaticPaths() {
  const tagUrls = (await getTagSitemap({ pageNo: 1 })) || [];

  const UrlsArray = tagUrls?.map((Url) => Url?.split("/").slice(2));
  const paths = UrlsArray?.map((uriArray) => ({
    params: { slug: uriArray },
  }));
  return {
    paths: [],
    fallback: "blocking",
  };
}
