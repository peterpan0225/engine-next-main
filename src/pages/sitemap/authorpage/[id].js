import getAuthorSitemap from "@lib/wordpress/sitemap/getAuthorSitemap";
import generateSitemapPaths from "@utils/generateSitemapPaths";

export default function SitemapPage() {
  return null;
}
function GenerateSiteMap(authorUrls) {
  const paths = generateSitemapPaths(authorUrls);
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
  const authorUrls = await getAuthorSitemap({ pageNo: parseInt(params.id) });
  if (!authorUrls?.length) {
    return {
      notFound: true,
    };
  }

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(GenerateSiteMap(authorUrls));
  res.end();
  return { props: {} };
}
