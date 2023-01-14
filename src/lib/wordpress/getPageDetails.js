import { QUERY_PAGE_BY_URI } from "./graphqlQueries";
import { getApolloClient } from "./client";

async function getPageDetails(slug) {
  const apolloClient = getApolloClient();
  try {
    const { data } = await apolloClient.query({
      query: QUERY_PAGE_BY_URI,
      variables: {
        slug,
      },
    });
    return data.page;
  } catch (error) {
    console.log(error.message);
  }
}

export default getPageDetails;
