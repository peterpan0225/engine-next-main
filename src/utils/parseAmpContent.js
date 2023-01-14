import parse, { attributesToProps, domToReact } from "html-react-parser";
import style from "style-to-object";
export default function parseAmpContent(content, title) {
  if (!content) {
    return <p>No content found</p>;
  }
  //Known media extentions, add if missed anything
  const Downloadables = [
    ".xls",
    ".wav",
    ".zip",
    ".ppt",
    ".pdf",
    ".mp3",
    ".mp4",
    ".csv",
    ".avi",
    ".mov",
    ".png",
    ".jpg",
    ".webp",
  ];
  const InternalProf = ["http", "https", "www", "//"];

  const otherUrls = [
    "http://www.dynamicbusiness.com.au",
    "https://www.dynamicbusiness.com.au",
    "https://dynamicbusiness.com.au",
    "http://dynamicbusiness.com.au",
    "http://www.dynamicbusiness.com",
    "https://www.dynamicbusiness.com",
    "https://dynamicbusiness.com",
    "http://dynamicbusiness.com",
    "http://www.beta.dynamicbusiness.com",
    "https://www.beta.dynamicbusiness.com",
    "https://beta.dynamicbusiness.com",
    "http://beta.dynamicbusiness.com",
    "http://www.backend.dynamicbusiness.com",
    "https://www.backend.dynamicbusiness.com",
    "www.backend.dynamicbusiness.com",
    "https://backend.dynamicbusiness.com",
    "http://backend.dynamicbusiness.com",
  ];
  const options = {
    replace: ({ name, attribs, children, ...rest }) => {
      if (attribs && attribs.style) {
        try {
          style(attribs.style);
        } catch (error) {
          delete attribs.style;
          return domToReact(children, options);
        }
      }
      if (name === "figure") {
        return <div>{domToReact(children, options)}</div>;
      }
      if (name === "img") {
        return (
          <amp-img
            alt={attribs?.alt ? attribs.alt : title}
            src={attribs?.src}
            width={attribs.width}
            height={attribs.height}
            layout="intrinsic"
          >
            {domToReact(children, options)}
          </amp-img>
        );
      }
      if (name === "a") {
        const isExternal = InternalProf.some((v) => attribs?.href?.includes(v));
        const isOldInternal = otherUrls.some((v) => attribs?.href?.includes(v));
        const isDownloadable = Downloadables.some((v) =>
          attribs?.href?.includes(v)
        );
        const isInternalLink =
          attribs?.href?.includes(
            process.env.NEXT_PUBLIC_WORDPRESS_API_URL_BASE
          ) ?? false;
        if (isDownloadable) {
          const props = attributesToProps({
            ...attribs,
            target: "_blank",
            rel: "nofollow external noopener noreferrer",
          });
          return <a {...props}>{domToReact(children, options)}</a>;
        }
        if (isInternalLink && !isDownloadable) {
          return (
            <a
              href={attribs.href.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_API_URL_BASE,
                ""
              )}
              className="internal-page"
            >
              {domToReact(children, options)}
            </a>
          );
        } else if (isOldInternal) {
          return (
            <a
              href={attribs.href.replace(
                otherUrls.find((v) => attribs?.href?.includes(v)),
                ""
              )}
              className="internal-page"
            >
              {domToReact(children, options)}
            </a>
          );
        } else if (!isExternal) {
          return (
            <a className="internal-page" href={attribs.href}>
              {domToReact(children, options)}
            </a>
          );
        } else {
          const props = attributesToProps({
            ...attribs,
            target: "_blank",
            rel: "nofollow external noopener noreferrer",
          });
          return <a {...props}>{domToReact(children, options)}</a>;
        }
      }
    },
  };
  return parse(content, options);
}
