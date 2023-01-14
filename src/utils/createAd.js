export default function createAd({ slotName, sizes, ID }) {
  return googletag.cmd.push(() => {
    googletag.defineSlot(slotName, sizes, ID).addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
    googletag.display(ID);
  });
}
