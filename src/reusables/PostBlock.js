import Link from "@reusables/NavLink";
import AuthorUiOne from "@reusables/author-ui/AuthorUiOne";
import FeaturedImage from "@reusables/FeaturedImage";

export default function PostBlock({ post }) {
  const { featuredImage, category, title, uri, excerpt } = post;
  return (
    <>
      <article className="flex items-stretch space-x-3 it">
        <div className="feature-image  bg-gray-200 w-2/6 flex-shrink-0 rounded-md lg:rounded-none overflow-hidden">
          <FeaturedImage
            src={featuredImage?.sourceUrl ?? null}
            alt={featuredImage?.altText ?? title}
            width={250}
            height={200}
            unoptimized={false}
          />
        </div>
        <div className="content flex flex-col justify-center py-2">
          {category && (
            <Link
              className="text-sm md:text-base font-medium text-dynamic-red hover:underline"
              href={category?.uri}
            >
              {category?.name}
            </Link>
          )}
          <Link className="hover:underline" href={uri}>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl my-1 line-clamp-2">
              {title}
            </h3>
          </Link>
          <div
            className="hidden sm:block sm:line-clamp-2"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <AuthorUiOne post={post} />
        </div>
      </article>
    </>
  );
}
