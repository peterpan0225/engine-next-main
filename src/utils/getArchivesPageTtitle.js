export default function getArchivesPageTtitle({
  pageDetails,
  totalPages,
  currentPage,
}) {
  if (!pageDetails) {
    return `Blank Page Title`;
  }
  const title = pageDetails?.seo?.title;
  return currentPage === 1
    ? title
    : `${title} - Page ${currentPage} of ${totalPages}`;
}
