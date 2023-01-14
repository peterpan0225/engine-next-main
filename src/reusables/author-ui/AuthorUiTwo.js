import FeaturedImage from "@reusables/FeaturedImage";
import Link from "@reusables/NavLink";

export default function AuthorUiTwo({ author, date }) {
  const { name, uri, avatar } = author || {};
  if (!name) {
    return null;
  }
  return (
    <div className="author-ui mt-2">
      <div className="flex items-center">
        <Link
          className="left flex items-center space-x-2 hover:underline group"
          href={uri}
        >
          <div className="avatar rounded-full overflow-hidden flex-shrink-0	w-[40px] h-[40px] bg-gray-200">
            <FeaturedImage
              src={avatar?.url ?? `https://gravatar.com/avatar/?d=identicon`}
              alt={name}
              width={40}
              height={40}
              unoptimized={false}
            />
          </div>
          <div className="info flex flex-col">
            <p className=" inline-block text-base truncate max-w-[170px] group-hover:underline font-medium">
              {name}
            </p>
            <p className="leading-none text-sm">{date}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
