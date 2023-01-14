import MediaKitModal from "../../components/modal/MediaKitModal";
import AdvertisingOptionsSection from "./components/AdvertisingOptionsSection";
import BrandsSection from "./components/BrandsSection";
import ContactFormSection from "./components/ContactFormSection";
import InterestedSection from "./components/InterestedSection";
import TopSection from "./components/TopSection";
import TrafficSection from "./components/TrafficSection";
import TrustedBySection from "./components/TrustedBySection";

const AdvertisePage = () => {
  return (
    <div className="">
      <div className="relative bg-gray-50">
        <TopSection />
      </div>
      <BrandsSection />
      <TrustedBySection />
      <TrafficSection />
      <InterestedSection />
      <AdvertisingOptionsSection />
      {/* <ContactFormSection /> */}
      <MediaKitModal />
    </div>
  );
};

export default AdvertisePage;
