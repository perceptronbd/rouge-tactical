export const parseDuration = (duration) => {
  const regex = /(\d+)\s*(day|month|year)s?/i;
  const match = duration.match(regex);

  if (!match) {
    throw new Error(
      'Invalid duration format. Use formats like "1 year", "2 months", "3 days", etc.'
    );
  }

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "day":
      return value;
    case "month":
      return value * 30; // Assuming an average of 30 days per month
    case "year":
      return value * 365; // Assuming 365 days per year
    default:
      throw new Error('Invalid duration unit. Use "day", "month", or "year".');
  }
};
