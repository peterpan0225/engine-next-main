import { siteUrl } from "../CONSTANTS";
export default async function postsTofeed(blogPosts) {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.date);
    // Remember to change this URL to your own!
    const postHref = siteUrl + post.uri;
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    const categoryOne = post.categories.nodes.map(
      (post) => `<category><![CDATA[${post.name}]]></category>`
    );
    const categoryTwo = post.tags.nodes.map(
      (post) => `<category><![CDATA[${post.name}]]></category>`
    );
    const unArray = categoryOne.concat(categoryTwo);
    const arr = unArray.filter(function (value, index, array) {
      return array.indexOf(value) == index;
    });
    rssItemsXml += `
            <item>
              <title><![CDATA[${post.title}]]></title>
              <link>${postHref}</link>
              <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              ${arr.join("")}
              <guid isPermaLink="false">${postHref}</guid>
              ${
                post?.featuredImage?.node
                  ? `<enclosure url="${post.featuredImage.node.sourceUrl}" length="${post.featuredImage.node.fileSize}" type="${post.featuredImage.node.mimeType}" />`
                  : `<enclosure url="https://dynamicbusiness.com/images/socialmedial-fallback.png" length="4806" type="image/png" />`
              }
              <description>
              <![CDATA[${post.excerpt}]]>
              </description>
              <content:encoded>
                <![CDATA[${post.content}]]>
              </content:encoded>
          </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
}
