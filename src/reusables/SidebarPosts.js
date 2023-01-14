import SideBarPostBlock from "./SideBarPostBlock";
import dynamic from "next/dynamic";
import useGlobalConfig from "@contexts/GlobalSiteContext";
const VimeoVideo = dynamic(() => import("./VimeoVideo"));
const SidebarImage = dynamic(() => import("./SidebarImage"));
const EmailSubscribeForm = dynamic(() =>
  import("@components/modal/EmailSubscribeForm")
);

export default function SidebarPosts({ posts }) {
  const config = useGlobalConfig();
  const { sidebarVideo, sidebarImage, siteConfigOptions } = config || {};
  const {
    showVideo,
    showVideoTwo,
    textBelowVideoOne,
    textBelowVideoTwo,
    vimeoVideoIdOne,
    vimeoVideoIdTwo,
  } = sidebarVideo || {};
  const { showImage, textBelowImage, imageUrl } = sidebarImage || {};
  const { showMailchimp } = siteConfigOptions || {};

  return (
    <div className="flex flex-col space-y-5">
      {showVideo && (
        <VimeoVideo videoID={vimeoVideoIdOne} text={textBelowVideoOne} />
      )}
      {showVideoTwo && (
        <VimeoVideo videoID={vimeoVideoIdTwo} text={textBelowVideoTwo} />
      )}
      {showImage && (
        <SidebarImage imageUrl={imageUrl} textBelowImage={textBelowImage} />
      )}
      {showMailchimp && (
        <div className="">
          <h2 className="text-3xl font-bold">Get Tips, Business News & How to Articles Delivered Daily </h2>
          <p className="text-base">
            Our mission is to help you get better at business by helping you
            solve common business problems like sales, marketing, finance and HR
            and by keeping you up to date with business news, analysis and
            special offers.
          </p>
          <EmailSubscribeForm />
          <p className="text-xs font-light">
            You can unsubscribe anytime & we will never sell your data
          </p>
        </div>
      )}
      {!!posts?.length && (
        <div className="flex flex-col space-y-5">
          <h2 className="text-3xl font-bold">DB Brand Accounts</h2>
          {posts.map((post) => (
            <SideBarPostBlock key={post.title} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
