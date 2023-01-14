import { GET_AUTHOR_URLS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "../client";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
const apolloClient = getApolloClient();
async function getAuthorSitemap({ perPage = 200, pageNo }) {
  const { data } = await apolloClient.query({
    query: GET_AUTHOR_URLS,
    variables: {
      perPage,
      pageNo,
    },
  });
  if (!data?.getAuthorUrls) {
    return null;
  }
  return data?.getAuthorUrls ?? null;
}

export default getAuthorSitemap;
