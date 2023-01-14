import { siteUrl } from "../CONSTANTS";
export default function getSitemapPaths(count, path) {
  const items = [];
  for (let i = 1; i <= Math.ceil(count / 200); i++) {
    items.push(
      `<sitemap>
            <loc>
              ${siteUrl + `/sitemap/${path}/${i}`}
            </loc>
          </sitemap>`
    );
  }
  return items.join("");
}
