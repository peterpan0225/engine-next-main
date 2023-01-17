import Layout from "@components/Layout";
import Head from "next/head";
import { useState, useEffect } from "react";
import SidebarPosts from "@reusables/SidebarPosts";
import SidebarAd from "@components/ads/SidebarAd";
import getSearchPosts from "@lib/wordpress/getSearchPosts";
import PostBlock from "@reusables/PostBlock";
import PostPlaceholder from "@reusables/PostPlaceholder";
import getLatestPosts from "@lib/wordpress/getLatestPosts";

export default function SearchPage({ sidebarPosts }) {
  const [initialPosts, setInitialPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const featchSeachPosts = async (optionalString = null) => {
    try {
      setLoading(true);
      const queryText = optionalString ? optionalString : searchText;
      const response = await getSearchPosts({ query: queryText });
      setInitialPosts(response);
      setLoading(false);
    } catch (error) {
      console.log("Something is wrong");
    }
  };
  const searchNewPosts = async () => {
    if (searchText) {
      featchSeachPosts();
    } else {
      alert("You need to enter search text!");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchString = urlParams.get("name");
    if (searchString) {
      setSearchText(searchString);
      featchSeachPosts(searchString);
    }
  }, []);
  useEffect(() => {
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set("name", searchText);
    history.replaceState(null, null, "?" + queryParams.toString());
  }, [searchText]);

  return (
    <Layout>
      <Head>
        <meta name="description" content="Search page" />
        <meta name="robots" content="index, nofollow" />
        <meta name="og:description" content="Search page" />
        <meta name="twitter:description" content="Search page" />
      </Head>
      <section className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap lg:space-x-8 py-6 md:py-8">
        <main className="w-full lg:w-3/5 flex flex-col space-y-5 ">
          <div className="text hidden md:block font-semibold text-3xl mb-4">
            <h1>
              Results Found -{" "}
              <span className="text-dynamic-red">{searchText}</span>
            </h1>
          </div>
          <div className="search-box flex shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Enter your search keywords"
              className="rounded-l border w-full px-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={searchNewPosts}
              disabled={loading}
              className={`bg-black text-white px-4 md:px-6 py-2.5 ${
                loading ? "bg-gray-600 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Searching.." : "Search"}
            </button>
          </div>
          <p className="text-gray-400 mt-2 sr-only">
            If you're not happy with the results, please do another search.
          </p>
        </main>
      </section>
      <section className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap lg:space-x-8 py-6 md:py-8">
        <main className="w-full lg:w-3/5 flex flex-col space-y-5 ">
          <div className="flex flex-col space-y-5">
            {initialPosts && initialPosts?.length ? (
              initialPosts.map((post) => (
                <PostBlock key={post.id} post={post} />
              ))
            ) : (
              <p className={`font-semibold text-xl ${loading ? "hidden" : ""}`}>
                Enter a keyword to search
              </p>
            )}
            <div
              className={`placeholder-boxes flex-col space-y-6 ${
                loading ? "block" : "hidden"
              }`}
            >
              <PostPlaceholder />
              <PostPlaceholder />
              <PostPlaceholder />
              <PostPlaceholder />
              <PostPlaceholder />
            </div>
          </div>
        </main>
        <aside className="w-full block lg:w-2/5">
          <div className="flex flex-col space-y-5 lg:ml-4">
            <SidebarPosts posts={sidebarPosts} />
            <SidebarAd ID="tag_sidebar_add" />
          </div>
        </aside>
      </section>
    </Layout>
  );
}
export async function getStaticProps() {
  const sidebarPosts = await getLatestPosts();
  return {
    props: { sidebarPosts, key: "search_page" }, // will be passed to the page component as props
  };
}
