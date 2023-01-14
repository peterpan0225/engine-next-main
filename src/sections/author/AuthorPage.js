import PostBlock from "@reusables/PostBlock";
import usePageChange from "@hooks/usePageChange";
import React from "react";

const AuthorPage = React.memo(({ pageDetails, firstPage }) => {
  const { pageUrl, title, seoTitle, posts } = pageDetails;
  const ref = usePageChange({
    url: pageUrl,
    title: title ?? seoTitle,
    firstPage,
  });

  return (
    <>
      <>
        <div ref={ref} id={pageUrl} className="flex flex-col space-y-5">
          {!!posts &&
            posts.map((post) => <PostBlock key={post.id} post={post} />)}
        </div>
      </>
    </>
  );
});
export default AuthorPage;
