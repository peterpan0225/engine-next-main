import Layout from "@components/Layout";
import Link from "@reusables/NavLink";
import FeaturedImage from "@reusables/FeaturedImage";
import Head from "next/head";
export default function PageNotFound() {
  return (
    <Layout>
      <Head>
        <title>404 Page not found - Dynamic Business</title>
        <meta
          name="description"
          content="Grow your business with Dynamic Business"
        />
        {/* opengraph seo tags */}
        <meta name="og:title" content="Page not found - Dynamic Business" />
        <meta
          name="og:description"
          content="Grow your business with Dynamic Business"
        />
        {/* Twitter seo tags */}
        <meta
          name="twitter:title"
          content="Page not found - Dynamic Business"
        />
        <meta
          name="twitter:description"
          content="Grow your business with Dynamic Business"
        />
      </Head>
      {/* <div dangerouslySetInnerHTML={{ __html: postContent.outerHTML }}></div> */}

      <div className="container mx-auto md:px-4 py-8 md:py-16">
        <div className="content text-center">
          <h1 className="font-bold text-3xl md:text-5xl">
            Ooops... Something’s Missing
          </h1>
          <p className="mt-2">
            {`Sorry, but the page you are looking for doesn't exist.`}
          </p>
          <div className="relative max-w-md mx-auto mt-4">
            <FeaturedImage
              src="/images/arabica-1084 1.png"
              priority={true}
              width="300"
              height="300"
              fallback={false}
              alt="404 image"
            />
          </div>
          <Link
            href="/"
            className="bg-dynamic-red text-white p-4 inline-block mt-8 font-semibold px-8"
          >
            Visit Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
}
