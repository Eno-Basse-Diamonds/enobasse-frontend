/**
 * Formats a date into a human-readable ordinal string (e.g., "7th Jul 2026").
 *
 * @description Takes a Date object or ISO string and returns a formatted string
 * with ordinal suffix, abbreviated month, and full year.
 *
 * @param date - A Date object or ISO date string.
 * @returns The formatted date string with ordinal suffix, short month, and year.
 *
 * @example
 * dateToOrdinalDayMonthYear("2026-07-27") // "27th Jul 2026"
 */
export const dateToOrdinalDayMonthYear = (date: Date | string) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};
