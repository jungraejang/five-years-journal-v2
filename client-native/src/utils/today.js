export const today = (isoString) => {
  let todayDate = new Date(isoString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = todayDate.getDate();
  let month = monthNames[todayDate.getMonth()];
  let year = todayDate.getFullYear();
  let isoDate = null;
  isoString ? (isoDate = new Date(isoString)) : null;
  return {
    day: day,
    month: month,
    year: year,
    isoDate: isoDate,
  };
};
