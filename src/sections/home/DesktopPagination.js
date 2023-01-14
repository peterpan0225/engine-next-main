import Link from "@reusables/NavLink";
import FeaturedImage from "@reusables/FeaturedImage";
export default function DesktopPagination({ post, slider, active, index }) {
  const { title, uri, featuredImage } = post;
  return (
    <>
      <div
        onClick={() => {
          slider.moveToSlideRelative(index);
        }}
        className={`w-[370px]  z-20 ${
          active ? "bg-black" : "bg-black bg-opacity-70 relative"
        } text-white rounded-lg overflow-hidden flex`}
      >
        <div className="w-2/5 relative overflow-hidden">
          <Link href={post.uri} className="inline-blockk">
            <FeaturedImage
              src={featuredImage?.sourceUrl}
              alt={featuredImage?.altText}
              width={128}
              height={128}
              unoptimized={false}
            />
          </Link>
        </div>
        <div className="w-3/5 flex flex-col justify-center px-4">
          <Link href={uri} className="inline-blockk">
            <p className="line-clamp-3 font-semibold mt-1.5">{title}</p>
          </Link>
        </div>
      </div>
    </>
  );
}
