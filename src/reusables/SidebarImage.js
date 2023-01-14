import Image from "next/image";

export default function SidebarImage({
  imageUrl,
  textBelowImage,
  popUp = false,
}) {
  if (popUp) {
    return (
      <>
        <div>
          <div className="max-w-[200px] my-4 border-2 text-[0px]">
            {imageUrl && (
              <Image
                width={imageUrl?.mediaDetails.width}
                height={imageUrl?.mediaDetails.height}
                src={imageUrl.sourceUrl}
                alt={imageUrl.altText}
              />
            )}
          </div>
          {textBelowImage && (
            <p className="text-xl font-bold">{textBelowImage}</p>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        {imageUrl && (
          <Image
            width={imageUrl?.mediaDetails.width}
            height={imageUrl?.mediaDetails.height}
            src={imageUrl.sourceUrl}
            alt={imageUrl.altText}
          />
        )}
        {textBelowImage && (
          <p className="text-3xl font-bold">{textBelowImage}</p>
        )}
      </div>
    </>
  );
}
