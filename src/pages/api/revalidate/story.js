import GetPostDetailsBySlug from "@lib/wordpress/getPostDetailsBySlug";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  const storyUrl = req.body.URL;
  console.log(`Received a revalidation request for: ${storyUrl} `);
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATION_KEY) {
    console.log("UnAuthorized Request");
    return res.status(401).json({ message: "Invalid token" });
  }
  // const x =
  //   "https://dynamicbusiness.com/brand-account/how-to-save-yourself-from-a-business-systems-hairball.html";
  try {
    const storyPath = storyUrl.split(".com")[1];

    const pathArray = storyPath.split("/");
    const queryUrl = pathArray[pathArray.length - 1];
    const filteredQueryUrl = queryUrl.includes(".html")
      ? queryUrl.slice(0, -5)
      : queryUrl;
    const postDetails = await GetPostDetailsBySlug({ slug: filteredQueryUrl });
    const categoriesPaths = postDetails.categories.map((cat) => cat.uri);
    const authorPath = postDetails.author.uri;
    // Story revalidate
    console.log({ storyPathToRevalidate: storyPath });
    await res.unstable_revalidate(storyPath);
    // author revalidate
    console.log({ authorPathToRevalidate: authorPath });
    await res.unstable_revalidate(authorPath);
    // categs revalidate
    console.log({ categoriesPathsToRevalidate: categoriesPaths });
    for (const categoryPath of categoriesPaths) {
      try {
        await res.unstable_revalidate(categoryPath);
      } catch (err) {
        console.log("error revalidating categories");
      }
    }
    console.log("done revalidating");
    return res.json({ revalidated: true, message: "Revalidated Successfully" });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
