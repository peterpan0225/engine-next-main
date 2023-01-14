import generateUniqueId from "generate-unique-id";
import { useState } from "react";
import PostLoader from "@reusables/PostLoader";
import PostEndMessage from "@reusables/PostEndMessage";
import AuthorPage from "./AuthorPage";
import InfiniteScroll from "react-infinite-scroll-component";
import SidebarPosts from "@reusables/SidebarPosts";
import SidebarAd from "@components/ads/SidebarAd";
export default function AuthorSection({ authorPageDetails }) {
  const { haveNextPage, nextPageUrl, pageUrl, posts, seoTitle, trendingPosts } =
    authorPageDetails;
  const [hasMore, setHasMore] = useState(haveNextPage);
  const [nextPostUri, setNextPostUri] = useState(nextPageUrl);
  const [initialPages, setInitialPages] = useState([
    {
      pageDetails: {
        nextPageUrl,
        pageUrl,
        haveNextPage,
        posts,
        title: seoTitle,
      },
      firstPage: true,
      id: generateUniqueId(),
    },
  ]);
  const handleLoadMore = async () => {
    try {
      const fetchNextPage = await fetch(nextPostUri);
      const pageExist = fetchNextPage.status === 200;
      if (!pageExist) {
        setHasMore(false);
        return;
      }
      const html = await fetchNextPage.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const {
        props: { pageProps },
      } = JSON.parse(doc.getElementById("__NEXT_DATA__").textContent);

      if (!pageProps) {
        setHasMore(false);
        return;
      }
      const { authorPageDetails } = pageProps;
      setHasMore(authorPageDetails?.haveNextPage ?? false);
      setNextPostUri(authorPageDetails?.nextPageUrl);
      setInitialPages([
        ...initialPages,
        {
          pageDetails: authorPageDetails,
          firstPage: false,
          id: generateUniqueId(),
        },
      ]);
    } catch (error) {
      console.log(error);
      setHasMore(false);
    }
  };
  return (
    <>
      <InfiniteScroll
        dataLength={initialPages?.length ?? 0}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<PostLoader />}
        endMessage={<PostEndMessage />}
      >
        <section className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap lg:space-x-8 py-6 md:py-8">
          <main className="w-full lg:w-3/5 flex flex-col space-y-5 ">
            {!!initialPages &&
              initialPages.map(({ firstPage, id, pageDetails }) => (
                <AuthorPage
                  firstPage={firstPage}
                  pageDetails={pageDetails}
                  key={id}
                />
              ))}
          </main>
          <aside className="w-full hidden lg:block lg:w-2/5">
            <div className="flex flex-col space-y-5 lg:ml-4">
              <SidebarPosts posts={trendingPosts} />
              <SidebarAd ID="sidebar_add" />
            </div>
          </aside>
        </section>
      </InfiniteScroll>
    </>
  );
}
