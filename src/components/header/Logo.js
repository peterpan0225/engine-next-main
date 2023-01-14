import Link from "@reusables/NavLink";
import FeaturedImage from "@reusables/FeaturedImage";
export default function Logo() {
  return (
    <>
      <div className="container mx-auto flex items-center justify-center p-4 py-3 md:py-5">
        <Link href="/">
          <FeaturedImage
            src="/images/logo.svg"
            alt="Dynamic Business Logo"
            width={840}
            height={101.39}
            priority={true}
            fallback={false}
          />
          {/* <img src="/images/logo.svg" alt="" /> */}
        </Link>
      </div>
    </>
  );
}
