import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import generateUniqueId from "generate-unique-id";
import PostLoader from "@reusables/PostLoader";
import PostEndMessage from "@reusables/PostEndMessage";
import PostPage from "./PostPage";
import Layout from "@components/Layout";
import MasterheadAd from "@components/ads/MasterheadAd";
import { CommentsProvider } from "../../contexts/CommentsContext";

export default function PostSection({ postDetails }) {
  const [scrollCount, setScrollCount] = useState(0);

  const [hasMore, setHasMore] = useState(postDetails?.nextPostUri ?? false);
  const [nextPostUri, setNextPostUri] = useState(postDetails?.nextPostUri);
  const [initialPages, setInitialPages] = useState([
    {
      postDetails,
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
      const { postDetails } = pageProps;
      setHasMore(postDetails?.nextPostUri ? true : false);
      setNextPostUri(postDetails?.nextPostUri);
      setInitialPages([
        ...initialPages,
        {
          postDetails,
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
    <Layout>
      <MasterheadAd ID="post_master_ad" />
      <InfiniteScroll
        dataLength={initialPages?.length ?? 0} //This is important field to render the next data
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<PostLoader />}
        endMessage={<PostEndMessage />}
      >
        <div className="flex flex-col space-y-4 bg-gray-100">
          {!!initialPages &&
            initialPages.map(({ firstPage, id, postDetails }) => (
              <CommentsProvider key={id} postId={postDetails.id}>
                <PostPage
                  firstPage={firstPage}
                  postDetails={postDetails}
                  scrollCount={scrollCount}
                  setScrollCount={setScrollCount}
                />
              </CommentsProvider>
            ))}
        </div>
      </InfiniteScroll>
    </Layout>
  );
}
