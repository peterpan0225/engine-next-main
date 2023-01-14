import axios from "axios";

export default async function getTagSitemap({ pageNo }) {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_BACKEND}/wp-json/myplugin/v1/tags?page=${pageNo}`,
    method: "get",
  });
  return await res.data;
}
