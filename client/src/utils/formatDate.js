export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  if (isNaN(date)) {
    return "Invalid Date";
  }

  const month = date.toLocaleString("en-us", { month: "short" });
  const day = date.getDate();
  const daySuffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${month} ${day}${daySuffix} ${date.getFullYear()}`;
};
