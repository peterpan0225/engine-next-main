import getTotalCounts from "@lib/wordpress/sitemap/getTotalCounts";
import getSitemapPaths from "@utils/getSitemapPaths";
import { siteUrl } from "../CONSTANTS";
export default function SitemapPage() {
  return null;
}
function GenerateSiteMap(details) {
  const {
    getTotalPosts,
    getTotalTags,
    getTotalCategories,
    users: {
      pageInfo: { total: getTotalAuthors },
    },
  } = details;
  const categoryPaths = getSitemapPaths(getTotalCategories, "categorypage");
  const authorPaths = getSitemapPaths(getTotalAuthors, "authorpage");
  const tagPaths = getSitemapPaths(getTotalTags, "tagpage");
  const postPaths = getSitemapPaths(getTotalPosts, "postpage");

  return `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl + "/sitemap/pages"}</loc>
  </sitemap>
  ${categoryPaths}
  ${postPaths}
  ${authorPaths}
  ${tagPaths}
</sitemapindex>
  `;
}
export async function getServerSideProps({ res }) {
  const details = await getTotalCounts();
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(GenerateSiteMap(details));
  res.end();
  return { props: {} };
}
