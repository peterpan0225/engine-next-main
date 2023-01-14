import getCategorySitemap from "@lib/wordpress/sitemap/getCategorySitemap";
import generateSitemapPaths from "@utils/generateSitemapPaths";

export default function SitemapPage() {
  return null;
}
function GenerateSiteMap(categoryUrls) {
  const paths = generateSitemapPaths(categoryUrls);
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
  const categoryUrls = await getCategorySitemap({
    pageNo: parseInt(params.id),
  });
  if (!categoryUrls?.length) {
    return {
      notFound: true,
    };
  }

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(GenerateSiteMap(categoryUrls));
  res.end();
  return { props: {} };
}
