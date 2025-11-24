/**
 * CONSTANTS representing the words on the grid.
 * Note: 'FIVE_HR' and 'TEN_HR' distinguish hour words from minute words
 * to map to different grid locations.
 */
const HOURS = [
  'TWELVE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE_HR', 
  'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN_HR', 'ELEVEN'
];

const MINUTES = [
  '', // 0 minutes (Display O'CLOCK instead of a minute word)
  'FIVE', 
  'TEN', 
  'QUARTER', 
  'TWENTY', 
  'TWENTY FIVE', 
  'HALF' 
];

/**
 * Core Fuzzy Time Logic
 * * Converts a standard JavaScript Date object into a "Word Clock" format.
 * The logic rounds the time to the nearest 5-minute interval and determines
 * the phrasing (e.g., "TEN PAST SIX" or "TWENTY TO SEVEN").
 * * @param date - The current date and time
 * @returns An object containing the specific words to highlight
 */
export const timeToWords = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // 1. Fuzzy Rounding
  // Round minutes to the nearest 5 to match the word clock's precision.
  // e.g., 10:12 -> 10:10, 10:13 -> 10:15
  let roundedMinutes = Math.round(minutes / 5) * 5;

  // 2. Handle Hour Wrap-around
  // If rounding pushes us to 60, reset minutes to 00 and increment hour.
  // e.g., 10:58 -> rounds to 60 -> becomes 11:00
  if (roundedMinutes === 60) {
    roundedMinutes = 0;
    hours += 1;
  }

  // 3. Determine Relation ("TO" vs "PAST")
  let relation = ''; // Can be 'PAST', 'TO', or "O'CLOCK"
  let minuteIndex = 0; 

  if (roundedMinutes === 0) {
    // xx:00 -> IT IS [HOUR] O'CLOCK
    relation = "O'CLOCK";
    minuteIndex = 0;
  } else if (roundedMinutes <= 30) {
    // xx:05 to xx:30 -> IT IS [MINUTE] PAST [HOUR]
    relation = 'PAST';
    minuteIndex = roundedMinutes / 5;
  } else {
    // xx:35 to xx:55 -> IT IS [MINUTE] TO [NEXT_HOUR]
    relation = 'TO';
    // Calculate remaining minutes to the next hour (e.g. 35 mins = 25 to)
    // 60 - 35 = 25 -> index for "TWENTY FIVE"
    minuteIndex = (60 - roundedMinutes) / 5;
    // When using "TO", we refer to the *next* hour
    hours += 1; 
  }

  // 4. Normalize Hour (12-hour format)
  // Maps 0-23 hours to 0-11 index for the array
  // 0 (Midnight) -> 12, 13 (1 PM) -> 1
  const hourIndex = hours % 12; 
  
  const hourWord = HOURS[hourIndex];
  const minuteWord = MINUTES[minuteIndex];

  return {
    minuteWord, // e.g. "TWENTY" or ""
    relation,   // e.g. "PAST", "TO", "O'CLOCK"
    hourWord    // e.g. "SIX" or "FIVE_HR"
  };
};
