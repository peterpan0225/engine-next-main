export default function AmpHeader() {
  return (
    <>
      <style jsx>{`
        .header {
          background-color: #fff;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 200;
          height: 50px;
          border-bottom: 1px solid #cecece;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        a {
          text-decoration: none;
          color: black;
          font-size: 32px;
          font-weight: 700;
        }
      `}</style>
      <header className="header">
        <a href="https://dynamicbusiness.com">DynamicBusiness</a>
      </header>
      <nav>
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 200,
            marginTop: 14,
            marginLeft: "10px",
          }}
        >
          <button on="tap:sidebar1">Menu</button>
        </div>
        <amp-sidebar
          id="sidebar1"
          layout="nodisplay"
          style={{
            width: 300,
            zIndex: 2147483647,
            background: "white",
          }}
        >
          <amp-nested-menu layout="fill">
            <ul style={{ padding: "0 15px" }}>
              <li>
                <h4 amp-nested-submenu-open>Open Sub-Menu</h4>
                <div amp-nested-submenu>
                  <ul>
                    <li>
                      <h4 amp-nested-submenu-close>Go back</h4>
                    </li>
                    <li>
                      <h4 amp-nested-submenu-open>Open Another Sub-Menu</h4>
                      <div amp-nested-submenu>
                        <h4 amp-nested-submenu-close>Go back</h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="https://amp.dev/" rel="nofollow">
                  Link
                </a>
              </li>
            </ul>
          </amp-nested-menu>
        </amp-sidebar>
      </nav>
    </>
  );
}
