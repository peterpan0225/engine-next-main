import Link from "@reusables/NavLink";
import AuthorUiTwo from "@reusables/author-ui/AuthorUiTwo";
import FeaturedImage from "@reusables/FeaturedImage";
export default function SliderItem({ post, index }) {
  const { category, title, uri, excerpt, author, featuredImage, date } = post;

  return (
    <>
      <div className="flex h-full relative">
        <FeaturedImage
          priority={index == 0}
          src={featuredImage?.sourceUrl}
          alt={featuredImage?.altText}
          width={1200}
          height={700}
          unoptimized={false}
        />
        <div className="bg-black h-full bg-opacity-40 absolute inset-0 flex items-center lg:pl-[50px]">
          <div className="content max-w-[600px] lg:max-w-[400px] min-h-[450px] flex flex-col justify-center px-4 lg:px-8 py-16 text-white lg:text-current lg:bg-white">
            {!!category && (
              <Link
                className="text-sm md:text-base font-medium hover:underline mb-2 lg:mb-4"
                href={category.uri}
              >
                {category.name}
              </Link>
            )}
            <Link className="hover:underline" href={uri}>
              <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl my-1 line-clamp-2 sm:line-clamp-3">
                {title}
              </h2>
            </Link>
            <div className="hidden sm:block">
              <div
                dangerouslySetInnerHTML={{ __html: excerpt }}
                className="line-clamp-2 lg:line-clamp-3 my-2"
              />
            </div>
            <AuthorUiTwo author={author} date={date} />
            <div className="hidden lg:block mt-8">
              <Link
                className="hover:underline bg-dynamic-red text-white p-3 px-8"
                href={uri}
              >
                Continue Reading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
