import dynamic from "next/dynamic";
import useGlobalConfig from "@contexts/GlobalSiteContext";
const SidebaeAdComp = dynamic(() => import("./SidebaeAdComp"));

export default function SidebarAd({ ID }) {
  const config = useGlobalConfig();
  const showAd = config?.siteConfigOptions?.showAd ?? false;

  return <>{showAd ? <SidebaeAdComp ID={ID} /> : null}</>;
}
