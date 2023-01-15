import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import getHomePageSlider from "@lib/wordpress/getHomePageSlider";
import HomeSlider from "@sections/home/HomeSlider";
import getPostsByCategory from "@lib/wordpress/getPostsByCategory";
import CategoryBlock from "@sections/home/CategoryBlock";
import BuildInfo from "@reusables/BuildInfo";
import logPageBuild from "@utils/logPageBuild";
import MasterheadAd from "@components/ads/MasterheadAd";
import excludeCategories from "@lib/wordpress/excludeCategories";
import getPrefetchCategoryList from "@lib/wordpress/getPrefetchCategoryList";
import getFrontPageCategories from "@lib/wordpress/getFrontPageCategories";
import PostLoader from "@reusables/PostLoader";
import PostEndMessage from "@reusables/PostEndMessage";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { siteUrl } from "../CONSTANTS";


function HomePage({
  sliderPosts,
  categoryList,
  time,
  timeTook,
  excludeCat,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [categories, setCategories] = useState([...categoryList]);
  //console.log(categoryList);

  const [initialPageInfo, setInitialPageInfo] = useState({
    hasNextPage: true,
    endCursor: "",
  });
  const handleLoadMore = async () => {
    try {
      const { nodes, pageInfo } = await getFrontPageCategories(
        3,
        initialPageInfo.endCursor,
        excludeCat
      );
      setInitialPageInfo(pageInfo);
      setCategories([...categories, ...nodes]);
    } catch (error) {
      console.log(error);
    }
  };

  const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Dynamic Business",
      url:"https://dynamicbusiness.com",
      logo:"http://localhost:3000/images/logo.svg",
      publisher: {
        "@type": "Organization",
        name: "Dynamic Business",
        logo: {
          "@type": "ImageObject",
          url: "https://dynamicbusiness.com/favicon/favicon-32x32.png",
        },
      },
      sameAs:[
        "https://www.facebook.com/dynamicbusiness/",
        "https://www.instagram.com/dynamicbusinessau/",
        "https://twitter.com/DynamicBusiness",
        "https://www.linkedin.com/company/dynamicbusiness-com-au/"
      ]
    };

  // testing comment

  return (
    <BuildInfo time={time} timeTook={timeTook}>
      <Head>
        <link rel="canonical" href={`${siteUrl}`}/>
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta
          property="og:image"
          content={`${siteUrl}/images/socialmedial-fallback.png`}
        />
      </Head>
      <Layout pageType="home">
        <HomeSlider posts={sliderPosts} />
        <MasterheadAd ID="homepage_master_ad" />
        <InfiniteScroll
          dataLength={categories?.length ?? 0} //This is important field to render the next data
          next={handleLoadMore}
          hasMore={initialPageInfo.hasNextPage}
          loader={<PostLoader full={true} />}
          endMessage={<PostEndMessage full={true} />}
        >
          <section className="container mx-auto md:px-4">
            {categories &&
              categories.map((category) => (
                <CategoryBlock key={category.databaseId} {...category} />
              ))}
          </section>
        </InfiniteScroll>

      </Layout>
    </BuildInfo>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
  let executionStart = new Date();

  const sliderPosts = await getHomePageSlider({
    categoryId: 7,
  });
  const fetchCategoryNames = await getPrefetchCategoryList();

  const categories = fetchCategoryNames.split(",");
  const excludeCat = await excludeCategories();

  const categoryList = await Promise.all(
    categories.map(
      async (category) => await getPostsByCategory({ slug: category })
    )
  );
  const filteredCategoryList = categoryList.filter((item: any) => item);
  const dbIds = filteredCategoryList.map((item: any) => item?.databaseId);
  const executionEnd = +new Date() - +executionStart;
  logPageBuild({ url: "/", timeTook: executionEnd });
  return {
    props: {
      sliderPosts,
      categoryList: filteredCategoryList,
      timeTook: executionEnd,
      excludeCat: dbIds.concat(excludeCat),

      time: executionStart.toString(),
      key: "home-page",
    },
    revalidate: 1200,
  };
};
