export const formatDate = (inputDate) => {
  const parts = inputDate.split(/-|\//);
  if (parts.length === 3) {
    const month = new Date(parts[0], parts[1] - 1, parts[2]).toLocaleString(
      "en-us",
      {
        month: "short",
      }
    );
    const day = parseInt(parts[2]);
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    return `${month} ${day}${daySuffix} ${parts[0]}`;
  } else {
    return "Invalid Date";
  }
};
