import path from "path";
import fs from "fs";

export default async function getBuildID() {
  const absolutePath = path.join(__dirname, "../../prerender-manifest.json");
  if (fs.existsSync(absolutePath)) {
    const data = await fs.readFileSync(
      absolutePath,
      "utf8",
      (err, jsonString) => {
        if (err) {
          return null;
        }
        return jsonString;
      }
    );
    const BuildID = JSON.parse(data).routes["/"].dataRoute.split("/")[3];
    return BuildID;
  }
  return null;
}
