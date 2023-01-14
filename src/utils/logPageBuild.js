export default function logPageBuild({
  url,
  timeTook = null,
  type = "generating",
}) {
  const buildTime = new Date();
  const fullString = `${buildTime.toString()} ${type} - ${url} took approx ${timeTook} ms.`;
  console.log("\x1b[32m", fullString); //green
}
