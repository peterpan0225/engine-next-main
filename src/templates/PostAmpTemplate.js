import AmpLayout from "@components/AmpLayout";
import parseAmpContent from "@utils/parseAmpContent";
export default function PostAmpTemplate({ postDetails }) {
  const { content, title, featuredImage } = postDetails;
  const { altText, caption, mediaDetails, sourceUrl } = featuredImage || {};
  return (
    <AmpLayout>
      <header className="header">
        <style jsx>{`
          max-width: 900px;
          margin: 0 auto;
          h1 {
            margin-bottom: 20px;
            margin-top: 20px;
          }
          amp-img {
            margin-bottom: 20px;
            margin-top: 20px;
          }
        `}</style>
        <h1>{title}</h1>
        {sourceUrl && (
          <amp-img
            alt={altText ? altText : title}
            src={sourceUrl}
            width={mediaDetails?.width}
            height={mediaDetails?.height}
            layout="responsive"
          ></amp-img>
        )}
        {caption && (
          <div
            className="text-xs"
            dangerouslySetInnerHTML={{
              __html: caption,
            }}
          />
        )}
      </header>
      <div className="post-body">
        <style jsx>{`
          max-width: 640px;
          margin: 0 auto;
          margin-top: 20px;
          padding-left: 10px;
          padding-right: 10px;
        `}</style>
        {parseAmpContent(content)}
      </div>
    </AmpLayout>
  );
}
