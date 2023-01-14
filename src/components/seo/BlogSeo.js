import { siteUrl } from "../../CONSTANTS";
import Head from "next/head";
import Script from "next/script";

export default function BlogSeo({ postDetails }) {
  const { seo, author, uri, categories, date, modified, featuredImage } =
    postDetails || {};
  if (!seo) {
    return (
      <Head>
        <title>Dynamic Business</title>
      </Head>
    );
  }
  const { readingTime, title, twitterDescription } = seo || {};
  const description = twitterDescription.replace("[…]", "").trim();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postDetails?.title,
    description: postDetails?.excerpt,
    thumbnailUrl: postDetails?.featuredImage?.sourceUrl,
    datePublished: postDetails?.date,
    dateModified: postDetails?.modified,
    author: {
      "@type": "Person",
      name: postDetails.author.name,
      url: `${siteUrl}${postDetails.author.uri}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Dynamic Business",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon/favicon-32x32.png`,
      },
    },
  };
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl + uri} />
      {/* <link rel="amphtml" href={`${siteUrl + "/amp" + uri}`} /> */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`Dynamic Business » Feed`}
        href={`${siteUrl}/feed.xml`}
      />
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* meta og tags */}
      <meta property="og:locale" content="en_AU" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl + uri} />
      <meta property="og:site_name" content="Dynamic Business" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/dynamicbusiness"
      />
      <meta property="article:author" content={author?.name} />
      {!!categories && categories.length && (
        <meta property="article:section" content={categories[0]?.name} />
      )}
      {!!categories &&
        categories.length &&
        categories.map((tag) => (
          <meta key={tag.name} property="article:tag" content={tag?.name} />
        ))}
      <meta property="article:published_time" content={date} />
      <meta property="article:modified_time" content={modified} />
      <meta
        property="og:image"
        content={
          featuredImage?.sourceUrl ??
          `${siteUrl}/images/socialmedial-fallback.png`
        }
      />
      <meta
        property="og:image:width"
        content={featuredImage?.mediaDetails?.width ?? 800}
      />
      <meta
        property="og:image:height"
        content={featuredImage?.mediaDetails?.height ?? 467}
      />
      {/* Twitter tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@DynamicBusiness" />
      <meta name="twitter:site" content="@DynamicBusiness" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author?.name} />
      <meta name="twitter:label2" content="Est. reading time" />
      <meta
        name="twitter:data2"
        content={`${readingTime} ${readingTime <= 1 ? "minute" : "minutes"}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={
          featuredImage?.sourceUrl ??
          `${siteUrl}/images/socialmedial-fallback.png`
        }
      />
      <meta
        name="twitter:image:alt"
        content={featuredImage?.altText ?? title}
      />
    </Head>
  );
}
