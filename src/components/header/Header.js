import Logo from "./Logo";
import Navbar from "./Navbar";
import Notice from "./Notice";
import MobileNavigation from "./MobileNavigation";
export default function Header({ pageType }) {
  const showOptinMonsterDiv = pageType === "home";
  return (
    <>
      <header className="header">
        <div className="border-b">
          <Logo />
        </div>
        <Navbar />
        <MobileNavigation />
      </header>
      {showOptinMonsterDiv && <div id="om-shxqwwgxgwlqvjyxeoq9-holder"></div>}
      <Notice />
    </>
  );
}
