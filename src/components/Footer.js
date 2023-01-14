import Link from "@reusables/NavLink";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto p-4 py-8">
        <p className="font-bold text-4xl">About Us</p>
        <p className="text-gray-400 mt-4">
          Dynamic Business has been helping business owners and managers for 27
          years
        </p>
        <div className="mt-4 flex flex-wrap">
          <Link
            href="/page/contact-us"
            activeClassName="text-dynamic-red"
            className="mb-2 mr-4"
          >
            DB Contributors Network - Pitch a Story
          </Link>
          <Link
            href="/page/advertise"
            activeClassName="text-dynamic-red font-semibold"
            className="mb-2 mr-4"
          >
            Advertise
          </Link>
          <Link href="/privacy-policy" className="mb-2 mr-4">
            Privacy Policy
          </Link>
          <Link
            href="/page/australian-grants-assistance"
            activeClassName="text-dynamic-red"
            className="mb-2 mr-4"
          >
            Australian Business Grants
          </Link>
          <Link
            href="/page/db-lifestyle-free-listing"
            activeClassName="text-dynamic-red"
            className="mb-2 mr-4"
          >
            List your Product on DB LifeStyle
          </Link>
        </div>
      </div>
      <div style={{ backgroundColor: "#C62644" }}>
        <div className="pb-12 md:pb-2 container mx-auto  text-white px-4 py-2">
          <p>© Copyrights 2020 by Dynamic Business - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
