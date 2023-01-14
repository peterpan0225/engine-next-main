import { siteUrl } from "../CONSTANTS";
export default function generateSitemapPaths(array) {
  const items = array.map(
    (item) =>
      `
          <url>
              <loc>${siteUrl + item}</loc>
          </url>
          `
  );
  return items.join("");
}
