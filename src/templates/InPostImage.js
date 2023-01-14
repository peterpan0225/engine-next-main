import Image from "next/image";
import { useEffect, useState } from "react";

// Unlike FeaturedImage component - this will provide fallback even when the srcURL Exists but is returning 404
export default function InPostImage({ src, ...rest }) {
  const [imgSrc, set_imgSrc] = useState(src);
  const fallbackSrc = `/images/fallback-featured-image.png`;

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
    />
  );
}
