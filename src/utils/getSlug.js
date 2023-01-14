export default function getSlug(pageNumber, slug, paginated) {
  return !isNaN(pageNumber) && paginated
    ? slug[slug?.length - 3]
    : slug[slug?.length - 1];
}
