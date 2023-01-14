import Link from "@reusables/NavLink";
import FeaturedImage from "@reusables/FeaturedImage";

export default function AuthorUiOne({ post }) {
  const { author, date } = post;

  return (
    <div className="author-ui mt-2">
      <div className="flex justify-between items-center">
        <Link
          href={author?.uri}
          className="left flex items-center space-x-2 hover:underline group"
        >
          <div className="avatar rounded-full overflow-hidden flex-shrink-0	w-[40px] h-[40px] bg-gray-200">
            <FeaturedImage
              src={
                author?.avatar?.url ??
                `https://gravatar.com/avatar/?d=identicon`
              }
              alt={author?.name}
              width={40}
              height={40}
              unoptimized={false}
            />
          </div>
          <div className="info">
            <p className=" inline-block truncate max-w-[170px] group-hover:underline font-medium">
              {author?.name}
            </p>
            <p className="hidden sm:block leading-none text-sm -mt-1 ">
              Author
            </p>
            <p className="sm:hidden leading-none text-sm -mt-0.5 ">{date}</p>
          </div>
        </Link>
        <div className="right hidden sm:block">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
