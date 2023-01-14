import featch from "./fetch";

async function excludeCategories() {
  const data = await featch(
    `
    query MyQuery {
        excludeCategories
      }
    
        `
  );
  return data?.excludeCategories;
}

export default excludeCategories;
