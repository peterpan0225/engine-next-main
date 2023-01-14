export default async function sanitizeSlug(slug) {
  return slug.map((item) =>
    encodeURIComponent(item.replace(/\s+/g, "").replace(/['’…*“"”‘()]+/g, ""))
      .replace(/['()]/g, escape)
      .replace(/\*/g, "%2A")
      .replace(/%(?:7C|60|5E)/g, unescape)
      .replace(/%(?:E2|80|93)/g, "")
  );
}
