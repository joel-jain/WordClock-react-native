/**
 * 11x10 Letter Grid
 * * A static 2D array representing the physical layout of the word clock.
 * Rows are indexed 0-9, Columns 0-10.
 */
export const CLOCK_GRID = [
  ["I", "T", "L", "I", "S", "A", "S", "T", "I", "M", "E"],
  ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "D", "C"],
  ["T", "W", "E", "N", "T", "Y", "F", "I", "V", "E", "X"],
  ["H", "A", "L", "F", "B", "T", "E", "N", "F", "T", "O"],
  ["P", "A", "S", "T", "E", "R", "U", "N", "I", "N", "E"],
  ["O", "N", "E", "S", "I", "X", "T", "H", "R", "E", "E"],
  ["F", "O", "U", "R", "F", "I", "V", "E", "T", "W", "O"],
  ["E", "I", "G", "H", "T", "E", "L", "E", "V", "E", "N"],
  ["S", "E", "V", "E", "N", "T", "W", "E", "L", "V", "E"],
  ["T", "E", "N", "S", "E", "O'", "C", "L", "O", "C", "K"]
];

/**
 * Coordinate Mapping
 * * Maps logical word keys (e.g., "IT", "TEN_HR") to their specific
 * [row, col] coordinates on the CLOCK_GRID.
 */
export const WORD_MAP: Record<string, number[][]> = {
  "IT": [[0, 0], [0, 1]],
  "IS": [[0, 3], [0, 4]],
  "A":  [[1, 0]], 
  "QUARTER": [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]],
  // ... (rest of the map remains unchanged)
  "O'CLOCK": [[9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10]]
};
