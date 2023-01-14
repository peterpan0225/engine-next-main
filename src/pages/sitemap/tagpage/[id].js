import getTagSitemap from "@lib/wordpress/sitemap/getTagSitemap";
import generateSitemapPaths from "@utils/generateSitemapPaths";

export default function SitemapPage() {
  return null;
}
function GenerateSiteMap(tagUrls) {
  const paths = generateSitemapPaths(tagUrls);
  return `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths}
  </urlset>
  `;
}
export async function getServerSideProps({ res, params }) {
  if (isNaN(params.id)) {
    return {
      notFound: true,
    };
  }
  const tagUrls = await getTagSitemap({ pageNo: parseInt(params.id) });
  if (!tagUrls?.length) {
    return {
      notFound: true,
    };
  }

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(GenerateSiteMap(tagUrls));
  res.end();
  return { props: {} };
}
