import { WORD_MAP, CLOCK_GRID } from '../clockData';

describe('Grid Data Integrity', () => {
  
  test('all coordinates in WORD_MAP are within grid bounds', () => {
    const numRows = CLOCK_GRID.length;      // 10
    const numCols = CLOCK_GRID[0].length;   // 11

    // Loop through every word (e.g., "TEN", "TWENTY")
    Object.keys(WORD_MAP).forEach((wordKey) => {
      const coords = WORD_MAP[wordKey];

      // Loop through every coordinate for that word
      coords.forEach(([row, col]) => {
        // Check Row
        if (row < 0 || row >= numRows) {
          throw new Error(`Word "${wordKey}" has invalid ROW index: ${row}`);
        }
        // Check Col
        if (col < 0 || col >= numCols) {
          throw new Error(`Word "${wordKey}" has invalid COL index: ${col}`);
        }
      });
    });
  });

  test('critical compound words exist in the map', () => {
    // These are words that are formed by combining others, 
    // or are special keys we rely on.
    const requiredKeys = [
      "TWENTY FIVE", 
      "TEN_HR", 
      "FIVE_HR", 
      "O'CLOCK"
    ];

    requiredKeys.forEach(key => {
      expect(WORD_MAP).toHaveProperty(key);
    });
  });

  test('letters map correctly (Optional sanity check)', () => {
    // Let's spot check that "TEN" actually points to T-E-N
    const tenCoords = WORD_MAP["TEN"]; // Minute ten
    // Based on your grid: Row 3, Cols 5,6,7 -> "T", "E", "N"
    
    const letters = tenCoords.map(([r, c]) => CLOCK_GRID[r][c]).join('');
    expect(letters).toBe("TEN");
  });
});