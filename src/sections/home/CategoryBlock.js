import Link from "@reusables/NavLink";
import PostBlock from "./PostBlock";

export default function CategoryBlock(category) {
  const { name, uri, posts } = category;
  if (!posts?.length) {
    return null;
  }
  return (
    <>
      <div className="border-b-[14px] md:border-0 border-dynamic-lightGray pb-6">
        <div className="flex justify-between items-center px-4 md:px-0 my-4 md:my-8">
          <p className="font-semibold text-xl md:text-2xl md:font-bold">
            {name}
          </p>
          <Link
            href={uri}
            className="inline-block text-dynamic-red font-semibold text-sm md:text-base hover:underline"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostBlock key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
