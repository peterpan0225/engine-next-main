import { GET_TOTAL_COUNTS } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "../client";

//Get author details and if no user exits return false or if user exits but have not posted any post
// Return a author object for a author if posted blog on the site
async function getTotalCounts() {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: GET_TOTAL_COUNTS,
  });
  if (!data) {
    return null;
  }
  return data ?? null;
}

export default getTotalCounts;
