import Image from "next/image";

export default function FeaturedImage({
  src,
  alt = "",
  width = 500,
  height = 500,
  // priority defaults to false if not provided
  priority = false,
  fallback = true,
  postPage = false,
}) {
  const srcUrl = `/images/fallback-featured-image.png`;
  if (postPage && !src) {
    return null;
  }
  return (
    <>
      <div
        className={`feature-image h-full w-full relative overflow-hidden text-[0px] ${
          fallback ? "bg-gray-500" : ""
        }`}
      >
        <img
          src={ src&&src ? src : srcUrl}
          alt={alt}
          layout="intrinsic"
          className="object-cover w-full h-full"
          objectFit="cover"
          style={{width, height}}
          // width={width}
          // height={height}
          // All featuredImages are prioritized and optimized except for /category/slug pages (only top section will be prioritized)
          // priority={priority}
          // unoptimized={false}
        />
      </div>
    </>
  );
}
