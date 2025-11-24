import { timeToWords } from '../timeUtils';

describe('Fuzzy Time Logic (timeToWords)', () => {
  
  // Helper to construct a Date object with specific time
  const createTime = (hours: number, minutes: number) => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  describe('Exact Times', () => {
    test('handles exact hour (10:00)', () => {
      const time = createTime(10, 0);
      expect(timeToWords(time)).toEqual({
        minuteWord: '',
        relation: "O'CLOCK",
        hourWord: 'TEN_HR'
      });
    });

    test('handles half past (10:30)', () => {
      const time = createTime(10, 30);
      expect(timeToWords(time)).toEqual({
        minuteWord: 'HALF',
        relation: 'PAST',
        hourWord: 'TEN_HR'
      });
    });
  });

  describe('Fuzzy Rounding', () => {
    test('rounds down (10:12 -> 10:10)', () => {
      const time = createTime(10, 12);
      expect(timeToWords(time)).toEqual({
        minuteWord: 'TEN',
        relation: 'PAST',
        hourWord: 'TEN_HR'
      });
    });

    test('rounds up (10:13 -> 10:15)', () => {
      const time = createTime(10, 13);
      expect(timeToWords(time)).toEqual({
        minuteWord: 'QUARTER',
        relation: 'PAST',
        hourWord: 'TEN_HR'
      });
    });
  });

  describe('"TO" Logic & Hour Wrap', () => {
    test('handles "TO" relation (10:40 -> TWENTY TO ELEVEN)', () => {
      const time = createTime(10, 40);
      expect(timeToWords(time)).toEqual({
        minuteWord: 'TWENTY',
        relation: 'TO',
        hourWord: 'ELEVEN' 
      });
    });

    test('handles near-next-hour rounding (10:58 -> 11:00)', () => {
      const time = createTime(10, 58);
      expect(timeToWords(time)).toEqual({
        minuteWord: '',
        relation: "O'CLOCK",
        hourWord: 'ELEVEN'
      });
    });
  });

  describe('Edge Cases (Midnight/Noon)', () => {
    test('handles midnight (00:00 -> TWELVE)', () => {
      const time = createTime(0, 0);
      expect(timeToWords(time)).toEqual({
        minuteWord: '',
        relation: "O'CLOCK",
        hourWord: 'TWELVE'
      });
    });

    test('handles noon (12:00 -> TWELVE)', () => {
      const time = createTime(12, 0);
      expect(timeToWords(time)).toEqual({
        minuteWord: '',
        relation: "O'CLOCK",
        hourWord: 'TWELVE'
      });
    });

    test('handles 23:55 -> FIVE TO TWELVE (next day wrap)', () => {
      const time = createTime(23, 55);
      expect(timeToWords(time)).toEqual({
        minuteWord: 'FIVE',
        relation: 'TO',
        hourWord: 'TWELVE' // 23+1 = 24 -> 0 -> TWELVE
      });
    });
  });
});
