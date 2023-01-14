import getSiteConfig from "@lib/wordpress/getSiteConfig";

export default async function handler(req, res) {
  const siteConfig = await getSiteConfig();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=800"
  );
  res.status(200).json(siteConfig);
}
