import { GET_CATEGORY_URLS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "../client";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getCategorySitemap({ perPage = 200, pageNo }) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_CATEGORY_URLS,
    variables: {
      perPage,
      pageNo,
    },
  });
  if (!data?.getCategoryUrls) {
    return null;
  }
  return data?.getCategoryUrls ?? null;
}

export default getCategorySitemap;
