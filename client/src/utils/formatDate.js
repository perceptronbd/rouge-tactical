export const formatDate = (inputDate) => {
  const parts = inputDate.split(/-|\//);
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const monthName = new Date(inputDate + "T00:00:00").toLocaleString(
      "en-us",
      {
        month: "short",
      }
    );
    const dayNum = parseInt(day);
    const daySuffix =
      dayNum === 1 || dayNum === 21 || dayNum === 31
        ? "st"
        : dayNum === 2 || dayNum === 22
        ? "nd"
        : dayNum === 3 || dayNum === 23
        ? "rd"
        : "th";

    return `${monthName} ${dayNum}${daySuffix} ${year}`;
  } else {
    return "Invalid Date";
  }
};
