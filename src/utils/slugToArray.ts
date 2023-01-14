export default function slugToArray(slug: string): Array<string> {
  if (slug === "/") {
    return [];
  }
  const slugArray = slug.split("/");
  slugArray.shift();

  return slugArray;
}
