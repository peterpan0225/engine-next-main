const getBreadcrumbItems = (uri) => {
  if (!uri) return [];

  let pathArray = uri
    .split("/")
    .slice(1)
    .filter((el) => el !== "category");

  let breadcrumbItems = [];
  let currentUri = "/category";

  pathArray.forEach((el, i, arr) => {
    if (i !== arr.length - 1) {
      currentUri += `/${el}`;
      breadcrumbItems.push({ name: el, uri: currentUri });
    }
  });
  return breadcrumbItems;
};

export default getBreadcrumbItems;
