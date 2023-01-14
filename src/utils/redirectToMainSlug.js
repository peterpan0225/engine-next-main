/**
 * This function redirect page to the root url if its page 1
 * `https://dynamicbusines.com/author/dipankar/page/1` to `https://dynamicbusines.com/author/dipankar`
 * This takes the slug array from the getStaticProps and an base path`
 */
export default function redirectToMainSlug({
  base = "author",
  slugArray = [],
}) {
  const reDirectUrl = slugArray.slice(0, slugArray?.length - 2).join("/");
  return {
    redirect: {
      destination: `/${base}/${reDirectUrl}`,
      permanent: true,
    },
  };
}
