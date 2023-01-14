import FeaturedImage from "@reusables/FeaturedImage";
import AuthorUiTwo from "@reusables/author-ui/AuthorUiTwo";
import SharePost from "@reusables/SharePost";
import parsePostContent from "@utils/parsePostContent";
import Link from "@reusables/NavLink";
import SidebarPosts from "@reusables/SidebarPosts";
import usePageChange from "@hooks/usePageChange";
import SidebarAd from "@components/ads/SidebarAd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommentsList from "../../components/CommentsList";
import Breadcrumbs from "../../reusables/Breadcrumbs";
import getBreadcrumbItems from "../../utils/getBreadcrumbItems";
import { useRouter } from "next/router";

const PostPage = React.memo(
  ({ firstPage, postDetails, scrollCount, setScrollCount }) => {
    const { query, isReady } = useRouter();
    const commentsListRef = useRef(null);
    useEffect(() => {
      if (isReady && scrollCount === 0) {
        const scrollToComments = query.scrollToComments;
        if (scrollToComments === "1") {
          console.log("SCROLLED");
          setScrollCount((oldVal) => oldVal + 1);
          commentsListRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, [isReady]);

    const {
      uri,
      seo,
      content,
      title,
      featuredImage,
      categories,
      dateFormated,
      author,
      trendingPosts,
      tags,
    } = postDetails || {};
    const { altText, sourceUrl, caption } = featuredImage || {};

    const ref = usePageChange({
      url: uri,
      title: seo?.title ?? title,
      firstPage,
    });

    const breadcrumbItems = useMemo(() => getBreadcrumbItems(uri), [uri]);
    return (
      <>
        <div ref={ref} className="article-wrapper bg-white md:pt-4">
          <article>
            <header>
              <div className="container mx-auto md:px-4">
                <div className="my-5">
                  <Breadcrumbs items={breadcrumbItems} />
                </div>
                <FeaturedImage
                  src={sourceUrl}
                  alt={altText}
                  width={1280}
                  height={650}
                  postPage={true}
                  priority={true}
                  unoptimized={false}
                />
                {!!caption && (
                  <div
                    className="text-xs italic mt-1 font-serif"
                    dangerouslySetInnerHTML={{
                      __html: caption,
                    }}
                  />
                )}
              </div>
              <div className="container mx-auto pt-2 sm:pt-4 px-4">
                <div className="categories hidden sm:flex space-x-4 mb-4">
                  {!!categories?.length &&
                    categories.map((categorie) => (
                      <Link
                        key={categorie.databaseId}
                        href={categorie.uri}
                        className="bg-red-100 text-dynamic-red font-bold px-3 py-1 rounded-full hover:underline"
                      >
                        {categorie.name}
                      </Link>
                    ))}
                </div>
                <div className="mobile-categories sm:hidden mb-2">
                  {!!categories?.length && (
                    <Link
                      className=" text-dynamic-red font-bold"
                      href={categories[0].uri}
                    >
                      {categories[0].name}
                    </Link>
                  )}
                </div>
                <h1 className="text-2xl leading-tight md:leading-tight sm:text-4xl md:text-5xl  font-bold">
                  {title}
                </h1>
                <div className="border-t lg:border-t-0 pb-2 lg:pb-7 mt-4 lg:mt-7 flex flex-wrap items-center justify-between">
                  <AuthorUiTwo date={dateFormated} author={author} />
                  <SharePost url={uri} title={title} />
                </div>
              </div>
            </header>
            <section className="container mx-auto px-4">
              <div className="border-t flex flex-wrap lg:flex-nowrap lg:space-x-6 pt-3 sm:pt-4 md:pt-6 lg:pt-7">
                <main className="w-full lg:w-3/5 pb-8 md:pb-16">
                  {/* Optinmonster Script */}
                  <div id="om-gof25mbdd6o9glurl2xu-holder"></div>
                  <div className=" main-post-content prose sm:prose-lg prose-red blog-content max-w-none">
                    {parsePostContent(content, title)}
                  </div>
                  <div
                    ref={commentsListRef}
                    className="mt-12 bg-[#D2EDFE] rounded-xl	"
                  >
                    <CommentsList
                      postId={postDetails.id}
                      postURI={postDetails.uri}
                    />
                  </div>
                  <div className="flex space-x-2 flex-wrap mt-4">
                    {!!tags &&
                      tags.map((tag) => (
                        <Link
                          className="bg-gray-800 text-white px-2 italic mb-2 text-sm"
                          key={tag.id}
                          href={tag.uri}
                        >
                          #{tag.name}
                        </Link>
                      ))}
                  </div>
                  {!!author?.hasOwnProperty("description") ? (
                    <div className="author-bio border p-4 mt-6 md:mt-12">
                      <div className="author-image w-20 h-20 rounded-full overflow-hidden mb-2">
                        <FeaturedImage
                          src={
                            author?.avatar?.url ??
                            `https://gravatar.com/avatar/?d=identicon`
                          }
                          alt={author?.name}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className="text-2xl font-bold">{author?.name}</p>
                      <p className="my-2 md:my-4">{author?.description}</p>
                      <Link
                        className=" text-dynamic-red font-bold"
                        href={author?.uri}
                      >
                        View all posts
                      </Link>
                    </div>
                  ) : null}
                </main>
                <aside className="w-full lg:w-2/5 mt-7 lg:mt-0 pb-8">
                  <div className="flex flex-col space-y-5 lg:ml-4">
                    {/* <div className="hidden lg:block mb-8">
                    <CommentsList
                      postId={postDetails.id}
                      postURI={postDetails.uri}
                      limit={10}
                      showPostComment={false}
                    />
                  </div> */}
                    <SidebarPosts posts={trendingPosts} />
                    <SidebarAd ID={uri} />
                  </div>
                </aside>
              </div>
            </section>
          </article>
        </div>
      </>
    );
  }
);
export default PostPage;
