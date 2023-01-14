export default function doesAdExist(ID) {
  const htmlElement = document.getElementById(ID);
  return htmlElement?.hasChildNodes() ?? false;
}
