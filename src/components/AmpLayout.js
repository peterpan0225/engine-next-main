import AmpHeader from "./AmpHeader";
export default function AmpLayout({ children }) {
  return (
    <div className="amp-wrapper">
      <AmpHeader />
      <style jsx global>{`
        body {
          font-family: "Inter", serif;
          line-height: 1.15;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%
          margin: 0;
          padding: 0;
          border: 0;
        }
                article,aside,footer,header,nav,section {
          display: block
        }

        h1 {
          font-size: 2em;
          margin: .67em 0
          text-align: center;
        }

        img {
          border-style: none
        }

        .text-xs {
          font-size: 14px;
        }
        .article {
          margin-top:85px;
        }
      `}</style>
      <article className="article">{children}</article>
    </div>
  );
}
