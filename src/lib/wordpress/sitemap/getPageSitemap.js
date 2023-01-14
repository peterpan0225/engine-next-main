import { GET_PAGE_URLS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "../client";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getPageSitemap() {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_PAGE_URLS,
  });
  if (!data?.pages) {
    return null;
  }
  return data?.pages?.nodes ?? null;
}

export default getPageSitemap;
