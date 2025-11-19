const HOURS = [
  'TWELVE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE_HR', 
  'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN_HR', 'ELEVEN'
];
// ... keep the rest the same

const MINUTES = [
  '', // 0 minutes (O'CLOCK)
  'FIVE', 
  'TEN', 
  'QUARTER', 
  'TWENTY', 
  'TWENTY FIVE', 
  'HALF' 
];

/**
 * Converts a Date object into a Word Clock phrase.
 * Returns an object with parts so we can style them easily later.
 */
export const timeToWords = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // 1. Round minutes to nearest 5
  // e.g. 42 becomes 40, 43 becomes 45
  let roundedMinutes = Math.round(minutes / 5) * 5;

  // 2. Handle the "60" case (e.g., 10:58 rounds to 11:00)
  if (roundedMinutes === 60) {
    roundedMinutes = 0;
    hours += 1;
  }

  // 3. Determine "TO" or "PAST"
  let relation = ''; // "PAST", "TO", or empty for O'CLOCK
  let minuteIndex = 0; // Index to grab from MINUTES array

  if (roundedMinutes === 0) {
    relation = "O'CLOCK";
    minuteIndex = 0;
  } else if (roundedMinutes <= 30) {
    relation = 'PAST';
    minuteIndex = roundedMinutes / 5;
  } else {
    relation = 'TO';
    minuteIndex = (60 - roundedMinutes) / 5;
    hours += 1; // We look ahead to the next hour
  }

  // 4. Normalize Hour (12-hour format)
  // 0 or 12 or 24 -> Index 0 (TWELVE)
  // 1 or 13 -> Index 1 (ONE)
  const hourIndex = hours % 12; 
  
  const hourWord = HOURS[hourIndex];
  const minuteWord = MINUTES[minuteIndex];

  // Return structured data
  return {
    minuteWord, // e.g. "TWENTY"
    relation,   // e.g. "PAST" or "TO" or "O'CLOCK"
    hourWord    // e.g. "SIX"
  };
};