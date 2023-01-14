import dynamic from "next/dynamic";
import useGlobalConfig from "@contexts/GlobalSiteContext";
const MasterAdComp = dynamic(() => import("./MasterAdComp"));

export default function MasterheadAd({ ID }) {
  const config = useGlobalConfig();
  const showAd = config?.siteConfigOptions?.showAd ?? false;

  return <>{showAd ? <MasterAdComp ID={ID} /> : null}</>;
}
