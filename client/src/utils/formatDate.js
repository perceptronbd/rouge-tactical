export const formatDate = (inputDate) => {
  const parts = inputDate.split(/-|\//);
  if (parts.length !== 3) {
    return "Invalid Date";
  }

  const month = new Date(parts[2], parts[1] - 1, parts[0]).toLocaleString(
    "en-us",
    {
      month: "short",
    }
  );
  const day = parseInt(parts[0]);

  const daySuffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${month} ${day}${daySuffix} ${parts[2]}`;
};
