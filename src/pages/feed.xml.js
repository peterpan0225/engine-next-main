import getFeedsPosts from "@lib/wordpress/getFeedsPosts";
import postsTofeed from "@utils/postsTofeed";
import { siteUrl } from "../CONSTANTS";
const FeedPage = () => null;
function Feeds(feed) {
  const { rssItemsXml, latestPostDate } = feed;
  return `<?xml version="1.0" ?>
        <rss
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          version="2.0"
        >
          <channel>
              <title>Dynamic Business</title>
              <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
              <link>${siteUrl}</link>
              <description>
              Business expertise, news and inspiration for Australian small businesses and entrepreneurs
              </description>
              <language>en-US</language>
              <lastBuildDate>${new Date(
                latestPostDate
              ).toUTCString()}</lastBuildDate>
              ${rssItemsXml}
          </channel>
        </rss>`;
}
export async function getServerSideProps({ res }) {
  const posts = await getFeedsPosts();
  const feed = await postsTofeed(posts);
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=800"
  );
  res.write(Feeds(feed));
  res.end();
  return { props: {} };
}
export default FeedPage;
