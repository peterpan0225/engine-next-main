import Link from "@reusables/NavLink";
import AuthorUiTwo from "@reusables/author-ui/AuthorUiTwo";
import FeaturedImage from "@reusables/FeaturedImage";

export default function SliderItem({ post, index }) {
  const { author, date, uri, title, featuredImage, category } = post;
  return (
    <div className="flex h-full relative">
      <FeaturedImage
        priority={index == 0}
        src={featuredImage?.sourceUrl}
        alt={featuredImage?.altText}
        width={500}
        height={500}
        unoptimized={false}
      />
      <div className="bg-black h-full bg-opacity-40 absolute inset-0 text-white p-4 flex md:items-end pb-4 sm:pb-8 md:pb-12">
        <div className="content flex flex-col justify-center py-2">
          {!!category && (
            <Link
              className="text-sm md:text-base font-medium hover:underline"
              href={category.uri}
            >
              {category.name}
            </Link>
          )}
          <Link className="hover:underline" href={uri}>
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl my-1 line-clamp-2">
              {title}
            </h2>
          </Link>
          <AuthorUiTwo author={author} date={date} />
        </div>
      </div>
    </div>
  );
}
