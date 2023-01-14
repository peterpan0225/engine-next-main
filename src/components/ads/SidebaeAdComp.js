import { useEffect } from "react";
import useWindowSize from "@hooks/useWindowSize";
import createAd from "@utils/createAd";
import doesAdExist from "@utils/doesAdExist";
export default function SidebaeAdComp({ ID }) {
  const { width } = useWindowSize();
  useEffect(() => {
    const desktopAdd = doesAdExist(ID);
    if (width >= 970 && !desktopAdd) {
      createAd({
        slotName: "/9577281/DB_Com_Desktop_Sidebar_ROS",
        sizes: [
          [300, 250],
          [160, 600],
          [300, 600],
        ],
        ID,
      });
    }
  }, [width, ID]);
  //return null;
  return (
    <div className="lg:pb-8 lg:pt-5 bg-gray-100 mt-8">
      <div className="container mx-auto hidden lg:flex flex-col justify-center items-center">
        <span className="text-xs mb-1">ADVERTISEMENT</span>
        <div id={ID}></div>
      </div>
    </div>
  );
}
