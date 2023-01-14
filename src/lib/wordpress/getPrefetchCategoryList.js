import featch from "./fetch";

async function getPrefetchCategoryList() {
  const data = await featch(
    `
    query GetSiteConfig {
        siteConfig(id: "cG9zdDoxMjIzNzk=", idType: ID) {
          options: siteConfigOptions {
            topCategories: homePageTopCategories
          }
        }
      }
        `
  );
  return data?.siteConfig?.options?.topCategories ?? "news,tech";
}

export default getPrefetchCategoryList;
