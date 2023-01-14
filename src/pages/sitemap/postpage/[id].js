import getPostsSitemap from "@lib/wordpress/sitemap/getPostsSitemap";
import generateSitemapPaths from "@utils/generateSitemapPaths";

export default function SitemapPage() {
  return null;
}
function GenerateSiteMap(postUrls) {
  const paths = generateSitemapPaths(postUrls);
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
  const postUrls = await getPostsSitemap({ pageNo: parseInt(params.id) });
  if (!postUrls?.length) {
    return {
      notFound: true,
    };
  }

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(GenerateSiteMap(postUrls));
  res.end();
  return { props: {} };
}
