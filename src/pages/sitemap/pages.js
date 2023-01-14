import getPageSitemap from "@lib/wordpress/sitemap/getPageSitemap";
import { siteUrl } from "../../CONSTANTS";
export default function SitemapPage() {
  return null;
}
function GenerateSiteMap(pageUrls) {
  const paths = pageUrls.map(
    (item) =>
      `
          <url>
              <loc>${
                item.uri === "/" ? siteUrl : siteUrl + "/page" + item.uri
              }</loc>
          </url>
          `
  );
  return `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${paths.join("")}
  </urlset>
  `;
}
export async function getServerSideProps({ res }) {
  const pageUrls = await getPageSitemap();

  if (!pageUrls?.length) {
    return {
      notFound: true,
    };
  }

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(GenerateSiteMap(pageUrls));
  res.end();
  return { props: {} };
}
