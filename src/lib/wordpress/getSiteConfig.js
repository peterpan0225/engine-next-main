// import { GET_SITE_OPTION } from "@lib/wordpress/graphqlQueries";
// import { getApolloClient } from "./client";

// const apolloClient = getApolloClient();

// async function getSiteConfig() {
//   const { data } = await apolloClient.query({
//     query: GET_SITE_OPTION,
//   });
//   return data?.siteConfig;
// }

// export default getSiteConfig;
import featch from "./fetch";

async function getSiteConfig() {
  const data = await featch(
    `
    query SiteGlobalInfo {
      siteConfig(id: "cG9zdDoxMjIzNzk=") {
        siteConfigOptions {
          showAd
          showMailchimp
        }
        sidebarVideo {
          showVideo
          textBelowVideoOne
          textBelowVideoTwo
          vimeoVideoIdOne
          vimeoVideoIdTwo
          showVideoTwo
        }
        sidebarImage {
          showImage
          textBelowImage
          imageUrl {
            sourceUrl
            altText
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
    
        `
  );
  return data?.siteConfig;
}

export default getSiteConfig;
