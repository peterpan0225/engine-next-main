/**
 * This function redirect page to the root url if its a feed page
 * Wordpress default feed page pattern wont work.
 * This takes the slug array from the getStaticProps and an optional base path defaults to `null`
 */

export default function redirectIfFeedPage({ slugArray = [], base = null }) {
  const redirectUrl = slugArray.slice(0, -1).join("/");
  return {
    redirect: {
      destination: `/${base ? `${base}/` : ""}${redirectUrl}`,
      permanent: true,
    },
  };
}
