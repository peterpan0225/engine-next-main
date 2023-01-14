import { QUERY_IF_POST_EXIST_AND_URL } from "@lib/wordpress/graphqlQueries";
import { getApolloClient } from "./client";

const apolloClient = getApolloClient();

async function checkIfPostExists(slug) {
  const { data } = await apolloClient.query({
    query: QUERY_IF_POST_EXIST_AND_URL,
    variables: {
      slug,
    },
  });
  return data.post;
}

export default checkIfPostExists;
