import { useRouter } from "next/router";

export default function NavLink({
  className = "nav-link",
  activeClassName,
  href = "/",
  children,
}) {
  const router = useRouter();
  const isActive = router.pathname === href || router.asPath === href;
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <>
      <>
        <a
          href={href}
          onClick={handleClick}
          className={`next-link hover:underline ${className} ${
            isActive ? activeClassName : ""
          }`}
        >
          {children}
        </a>
      </>
    </>
  );
}
