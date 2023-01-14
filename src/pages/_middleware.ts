import { NextRequest, NextResponse } from "next/server";
import slugToArray from "@utils/slugToArray";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const slug = slugToArray(pathname);
  const feedsPage = slug[0];
  const siteMap = slug[0];
  const baseUrl = req.nextUrl.origin;

  if (feedsPage === "feed") {
    return NextResponse.redirect(`${baseUrl}/feed.xml`);
  }
  if (siteMap === "sitemap" && slug.length == 1) {
    return NextResponse.redirect(`${baseUrl}/sitemap.xml`);
  }

  const feedPage = slug[slug.length - 1] === "feed";
  if (feedPage) {
    const redirectUrl = slug.slice(0, -1).join("/");
    return NextResponse.redirect(`${baseUrl}/${redirectUrl}`);
  }

  const pageNumber = parseInt(slug[slug.length - 1]);
  const shouldBePaginated = ["category", "tag", "author", "sitemap"].some(
    (item) => slug.includes(item)
  );
  // if (!isNaN(pageNumber) && !shouldBePaginated) {
  //   return NextResponse.redirect(`/`);
  // }

  return NextResponse.next();
}
