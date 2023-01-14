export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  const authorPath = req.body.path;
  console.log(`Received a revalidation request for: ${authorPath} `);
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATION_KEY) {
    console.log("UnAuthorized Request");
    return res.status(401).json({ message: "Invalid token" });
  }
  // const x =
  //   "/brand-account/how-to-save-yourself-from-a-business-systems-hairball.html";
  try {
    await res.unstable_revalidate(authorPath);

    return res.json({ revalidated: true, message: "Revalidated Successfully" });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
