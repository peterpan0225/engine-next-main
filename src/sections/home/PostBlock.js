import Link from "@reusables/NavLink";
import FeaturedImage from "@reusables/FeaturedImage";
import AuthorUiTwo from "@reusables/author-ui/AuthorUiTwo";

export default function PostBlock({ post }) {
  const { uri, title, excerpt, author, date, featuredImage } = post;
  return (
    <>
      <article>
        <Link href={uri} className="block min-h-[250px] sm:min-h-0">
          <FeaturedImage
            src={featuredImage?.sourceUrl}
            alt={featuredImage?.altText}
            width={375}
            height={250}
            unoptimized={false}
          />
        </Link>
        <div className="px-4 py-3 md:p-0 md:pt-3">
          <Link href={uri} className="hover:underline">
            <h3 className="font-bold text-lg sm:text-xl sm:min-h-[56px]  my-1 line-clamp-2">
              {title}
            </h3>
          </Link>
          <div className="content w-full">
            <div
              dangerouslySetInnerHTML={{ __html: excerpt }}
              className="line-clamp-3 text-dynamic-gray my-2 mb-4"
            />
            <AuthorUiTwo author={author} date={date} />
          </div>
        </div>
      </article>
    </>
  );
}
