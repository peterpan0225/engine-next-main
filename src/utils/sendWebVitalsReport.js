import ReactGA from "react-ga";
export default function sendWebVitalsReport({ id, name, label, value }) {
  const eventData = {
    category: label,
    action: name,
    label: id,
    value: Math.round(value),
    nonInteraction: true,
  };
  if (window?.GA_INITIALIZED) {
    ReactGA.event(eventData);
  }
  //gtag.event(eventData);
}
