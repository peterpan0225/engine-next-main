import { siteUrl } from "../../CONSTANTS";
import Head from "next/head";
// import StructuredData from "@components/seo/StructuredData";

export default function ArchiveSeo({ pageDetails }) {
  const { seoTitle, totalPages, pageNo, prevPageUrl, nextPageUrl, pageUrl } =
    pageDetails || {};
  const description = `Dynamic Business provides Australian small businesses, startups and entrepreneurs with highly relevant business news, inspirational stories, expert advice and a range of informative educational resources.`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageDetails.seoTitle,
    url: `${siteUrl}${pageDetails.pageUrl}`,
  };
  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl + pageUrl} />
      {pageNo >= 2 && <link rel="prev" href={siteUrl + prevPageUrl} />}
      {pageNo < totalPages && <link rel="next" href={siteUrl + nextPageUrl} />}
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
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl + pageUrl} />
      <meta property="og:site_name" content="Dynamic Business" />
      <meta
        property="og:image"
        content={`${siteUrl}/images/socialmedial-fallback.png`}
      />
      <meta property="og:image:width" content={800} />
      <meta property="og:image:height" content={467} />
      {/* Twitter tags */}
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@DynamicBusiness" />
      <meta name="twitter:site" content="@DynamicBusiness" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={`${siteUrl}/images/socialmedial-fallback.png`}
      />
      <meta name="twitter:image:alt" content={seoTitle} />
    </Head>
  );
}
