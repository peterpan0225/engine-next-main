import "@styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import "keen-slider/keen-slider.min.css";
import sendWebVitalsReport from "@utils/sendWebVitalsReport";
import { LoginModalProvider } from "@contexts/LoginModalContext";
import { EmailSignupModalProvider } from "@contexts/EmailSignupModalContext";
import { AnylitcsContextProvider } from "@contexts/AnylitcsContext";
import { PageViewProvider } from "@contexts/PageViewContext";
import Head from "next/head";
import { siteUrl, TagmanagerID } from "./../CONSTANTS";
import { AuthProvider } from "@contexts/AuthContext";
import { GlobalSiteProvider } from "@contexts/GlobalSiteContext";
import { SearchModalProvider } from "@contexts/SearchModalContext";
import Script from "next/script";
import { MediaKitModalProvider } from "../contexts/MediaKitModalContext";
  import { Partytown } from '@builder.io/partytown/react';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Dynamic Business - Business News - How to grow your business - Sales -
          Marketing - Finance - Technology
        </title>
        <meta
          name="description"
          content="All your business news in one place"
        />
        <meta name="copyright" content="Dynamic Business" />
        <meta name="language" content="en_AU" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Dynamic Business" />
        <meta property="og:locale" content="en_AU" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@DynamicBusiness" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@DynamicBusiness" />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Dynamic Business » Feed"
          href={`${siteUrl}/feed.xml`}
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <meta
          name="google-site-verification"
          content="ZHMwqkTLhXhw6B9ohAEP3FQfzBGfP77JRmOVT87XFys"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="preconnect"
          href="https://backend.dynamicbusiness.com/"
          crossOrigin="true"
        />
        <link rel="dns-prefetch" href="https://backend.dynamicbusiness.com/" />
        <Partytown debug={true} forward={['dataLayer.push']} />
        <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `
            window.googletag = window.googletag || {cmd: []};
        `,
          }}
        />
        <script 
          async
          dangerouslySetInnerHTML={{
            __html:`!function(s,n,i,t,c,h){s.SnitchObject=i;s[i]||(s[i]=function(){
          (s[i].q=s[i].q||[]).push(arguments)});s[i].l=+new Date;c=n.createElement(t);
          h=n.getElementsByTagName(t)[0];c.src=‘//snid.snitcher.com/8419979.js’;
          h.parentNode.insertBefore(c,h)}(window,document,‘snid’,‘script’);
          snid(‘verify’, ‘8419979’);`
          }}
          >
        </script>
        <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${TagmanagerID}');
        `,
        }}
      />
        <script
          type="text/partytown"
          async
          dangerouslySetInnerHTML={{
            __html: `
            (function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,77163,86768);
        `,
          }}
        />
        <Script
        // @ts-ignore: Unreachable code error
          strategy="worker"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <Script
        // @ts-ignore: Unreachable code error
          strategy="worker"
          src="https://static.cloudflareinsights.com/beacon.min.js?token=0ed0223fd3f54e1bb0b0e7fb282d043d&spa=true"
        />
        <Script
          // @ts-ignore: Unreachable code error
          strategy="worker"
          src="https://player.vimeo.com/api/player.js"
        />
        <Script
        // @ts-ignore: Unreachable code error
          strategy="worker"
          src="https://cdn.requestmetrics.com/agent/current/rm.js"
          data-rm-token="z2zb7eb:q6vk7tv"
          async
        />
      </Head>
      <GlobalSiteProvider>
        <SearchModalProvider>
          <PageViewProvider>
            <EmailSignupModalProvider>
              <LoginModalProvider>
                <MediaKitModalProvider>
                  <AuthProvider>
                    <AnylitcsContextProvider>
                      <Component {...pageProps} />
                    </AnylitcsContextProvider>
                  </AuthProvider>
                </MediaKitModalProvider>
              </LoginModalProvider>
            </EmailSignupModalProvider>
          </PageViewProvider>
        </SearchModalProvider>
      </GlobalSiteProvider>
    </>
  );
}
export default MyApp;
export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "FCP":
      sendWebVitalsReport(metric);
      break;
    case "LCP":
      sendWebVitalsReport(metric);
      break;
    case "CLS":
      sendWebVitalsReport(metric);
      break;
    case "FID":
      sendWebVitalsReport(metric);
      break;
    case "TTFB":
      sendWebVitalsReport(metric);
      break;
    case "Next.js-hydration":
      sendWebVitalsReport(metric);
      break;
    case "Next.js-route-change-to-render":
      sendWebVitalsReport(metric);
      break;
    case "Next.js-render":
      sendWebVitalsReport(metric);
      break;
    default:
      break;
  }
}
