import sanitizeSlug from "@utils/sanitizeSlug";
import redirectIfFeedPage from "@utils/redirectIfFeedPage";
import redirectToMainSlug from "@utils/redirectToMainSlug";
import getSlug from "@utils/getSlug";
import Layout from "@components/Layout";
import logPageBuild from "@utils/logPageBuild";
import getCategoryDetails from "@lib/wordpress/getCategoryDetails";
import getPaginatedPosts from "@lib/wordpress/getPaginatedPosts";
import CategorySection from "@sections/category/CategorySection";
import getCategoryFeaturedPosts from "@lib/wordpress/getCategoryFeaturedPosts";
import CategorySlider from "@sections/category/CategorySlider";
import getArchivesPageTtitle from "@utils/getArchivesPageTtitle";
import ArchiveSeo from "@components/seo/ArchiveSeo";
import BuildInfo from "@reusables/BuildInfo";
import MasterheadAd from "@components/ads/MasterheadAd";
import getCategorySitemap from "@lib/wordpress/sitemap/getCategorySitemap";

export default function CategoryPage({
  sliderPosts = {},
  categoryPageDetails = null,
  time,
  timeTook,
}) {
  const { name } = categoryPageDetails;
  return (
    <BuildInfo time={time} timeTook={timeTook}>
      <Layout>
        <ArchiveSeo pageDetails={categoryPageDetails} />
        <header>
          <div className="container mx-auto">
            <h1 className="hidden md:block text-4xl font-bold p-4 md:py-6">
              {name}
            </h1>
            <p className="sr-only">{name}</p>
          </div>
        </header>
        <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          <CategorySlider posts={sliderPosts} />
        </div>
        <MasterheadAd ID="category_page_master_ad" />
        <CategorySection categoryPageDetails={categoryPageDetails} />
      </Layout>
    </BuildInfo>
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
    return redirectToMainSlug({ base: "category", slugArray: slug });
  }

  //Get author name from slug array and check if user exit otherwise set 404
  const categoryName = getSlug(pageNumber, slug, paginated);
  const categoryDetails = await getCategoryDetails(categoryName);
  if (!categoryDetails) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }
  //Parse the page number to a INT
  // Set par page post amount in size and offset amount
  const pageNumInt = !isNaN(pageNumber) ? parseInt(pageNumber) : 1;
  const size = 20;
  const offset = Math.abs(size * (pageNumInt - 1) + 5);
  const haveEnoughPosts = categoryDetails.totalPosts > 5;
  //Check how many nested page a author can have based on total posts and per page post size
  //If `pageNumInt` is more than the `maxPossiblePages` then return a 404 page no need to move forward
  const maxPossiblePages = Math.ceil(categoryDetails.totalPosts / size);
  if (pageNumInt > maxPossiblePages) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }
  //Get category 5 slider Posts
  const sliderPosts = await getCategoryFeaturedPosts({
    categoryId: categoryDetails?.databaseId,
    first: 5,
  });

  //Get author details along with post for this page
  const categoryPosts = await getPaginatedPosts({
    categoryDbId: categoryDetails?.databaseId,
    offset: haveEnoughPosts ? offset : 0,
    size,
  });

  const categoryPageDetails = {
    ...categoryDetails,
    totalPages: maxPossiblePages,
    seoTitle: getArchivesPageTtitle({
      pageDetails: categoryDetails,
      totalPages: maxPossiblePages,
      currentPage: pageNumInt,
    }),
    pageNo: pageNumInt,
    pageUrl: `/category/${slug.join("/")}`,
    nextPageUrl: `/category/${categoryName}/page/${pageNumInt + 1}`,
    prevPageUrl: `/category/${categoryName}/page/${pageNumInt - 1}`,
    posts: categoryPosts.posts,
    haveNextPage: categoryPosts.haveNextPage,
  };
  let executionEnd = new Date() - executionStart;
  logPageBuild({
    url: `/category/${slug.join("/")}`,
    timeTook: executionEnd,
  });
  return {
    props: {
      sliderPosts,
      timeTook: executionEnd,
      time: executionStart.toString(),
      categoryPageDetails,
      key: slug.join("-"),
    }, // will be passed to the page component as props
    revalidate: 86400, // In seconds
  };
}
export async function getStaticPaths() {
  const categoryUrls =
    (await getCategorySitemap({
      pageNo: 1,
    })) || [];

  const UrlsArray = categoryUrls?.map((Url) => Url?.split("/").slice(2));
  const paths = UrlsArray?.map((uriArray) => ({
    params: { slug: uriArray },
  }));

  return {
    paths: [],
    fallback: "blocking",
  };
}
