export default function formatPostDate(postDate) {
  const date = new Date(postDate);
  return `${getMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`;
}
const getMonthName = (date) => {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthList[date.getMonth()];
};
