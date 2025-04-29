import { format } from 'date-fns';

/**
 * Format Firestore Timestamp or JS Date to a readable string
 */
export const formatDate = (dateObj) => {
  if (!dateObj) return '';

  let dateToFormat;

  // Firestore Timestamp check
  if (dateObj.seconds) {
    dateToFormat = new Date(dateObj.seconds * 1000);
  } else {
    dateToFormat = new Date(dateObj);
  }

  return format(dateToFormat, 'dd MMM yyyy'); // Example: 26 Apr 2025
};
