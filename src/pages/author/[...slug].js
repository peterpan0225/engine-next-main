import sanitizeSlug from "@utils/sanitizeSlug";
import redirectIfFeedPage from "@utils/redirectIfFeedPage";
import redirectToMainSlug from "@utils/redirectToMainSlug";
import getSlug from "@utils/getSlug";
import getAuthorDetails from "@lib/wordpress/getAuthorDetails";
import Layout from "@components/Layout";
import FeaturedImage from "@reusables/FeaturedImage";
import AuthorSection from "@sections/author/AuthorSection";
import logPageBuild from "@utils/logPageBuild";
import getPaginatedPosts from "@lib/wordpress/getPaginatedPosts";
import getArchivesPageTtitle from "@utils/getArchivesPageTtitle";
import ArchiveSeo from "@components/seo/ArchiveSeo";
import MasterheadAd from "@components/ads/MasterheadAd";
import getAuthorSitemap from "@lib/wordpress/sitemap/getAuthorSitemap";

export default function AuthorPage({ authorPageDetails = {} }) {
  const { name, description, totalPosts, avatar } = authorPageDetails;
  return (
    <Layout>
      <ArchiveSeo pageDetails={authorPageDetails} />
      <header className="bg-gray-100">
        <div className="container mx-auto p-4 py-6 md:py-8">
          <div className="max-w-3xl text-center mx-auto flex flex-col items-center">
            <div className="avatar rounded-full overflow-hidden flex-shrink-0	w-[100px] h-[100px] bg-gray-200">
              <FeaturedImage
                priority={true}
                unoptimized={false}
                src={avatar}
                alt={name}
                width={100}
                height={100}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">{name}</h1>
            <span className="text-sm">{totalPosts} Posts</span>
            {description ? (
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className="mt-2"
              />
            ) : (
              <p className="mt-2">Author at Dynamic Business</p>
            )}
          </div>
        </div>
      </header>
      <MasterheadAd ID="author_page_master_ad" />
      <AuthorSection authorPageDetails={authorPageDetails} />
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
    return redirectToMainSlug({ base: "author", slugArray: slug });
  }

  //Get author name from slug array and check if user exit otherwise set 404
  const authorName = getSlug(pageNumber, slug, paginated);
  const authorDetails = await getAuthorDetails({ slug: authorName });
  if (!authorDetails) {
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
  const maxPossiblePages = Math.ceil(authorDetails.totalPosts / size);
  if (pageNumInt > maxPossiblePages) {
    return {
      notFound: true,
      revalidate: 180,
    };
  }
  //Get author details along with post for this page
  const authorPosts = await getPaginatedPosts({ authorName, offset, size });
  const authorPageDetails = {
    ...authorDetails,
    totalPages: maxPossiblePages,
    pageNo: pageNumInt,
    seoTitle: getArchivesPageTtitle({
      pageDetails: authorDetails,
      totalPages: maxPossiblePages,
      currentPage: pageNumInt,
    }),
    pageUrl: `/author/${slug.join("/")}`,
    nextPageUrl: `/author/${authorName}/page/${pageNumInt + 1}`,
    prevPageUrl: `/author/${authorName}/page/${pageNumInt - 1}`,
    posts: authorPosts.posts,
    haveNextPage: authorPosts.haveNextPage,
  };
  let executionEnd = new Date() - executionStart;
  logPageBuild({ url: `/author/${slug.join("/")}`, timeTook: executionEnd });
  return {
    props: { authorPageDetails, key: slug.join("-") }, // will be passed to the page component as props
    revalidate: 86400, // In seconds
  };
}
export async function getStaticPaths() {
  const authorUrls =
    (await getAuthorSitemap({ perPage: 5000, pageNo: 1 })) || [];

  const UrlsArray = authorUrls?.map((Url) => Url?.split("/").slice(2));
  const paths = UrlsArray?.map((uriArray) => ({
    params: { slug: uriArray },
  }));
  return {
    paths: [],
    fallback: "blocking",
  };
}
