import axios from "axios";

export default async function featch(query, { variables } = {}) {
  try {
    const res = await axios({
      url: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT,
      method: "post",
      data: {
        query,
        variables,
      },
    });
    // console.log(res.status, res.config.headers);
    const { data } = res.data;
    return data;
  } catch (error) {
    // console.log(error, query);
    throw new Error("Failed to fetch API");
  }
}
