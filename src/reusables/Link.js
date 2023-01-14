import NextLink from "next/link";
import { useRouter } from "next/router";

// Has nofollow rel attribute - use it primarirly for external links.
export default function Link({ className = "nav-link", href = "/", children }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        rel="nofollow"
        className={`next-link hover:underline ${className}`}
      >
        {children}
      </a>
    </>
  );
}
