export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  if (!isNaN(date)) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  } else {
    return "Invalid Date";
  }
};

export const formatDateToYYYYMMDD = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
