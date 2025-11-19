import { timeToWords } from '../timeUtils';

describe('timeToWords Logic', () => {
  
  const createTime = (hours: number, minutes: number) => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  test('handles exact hour (10:00)', () => {
    const time = createTime(10, 0);
    const result = timeToWords(time);
    expect(result).toEqual({
      minuteWord: '',
      relation: "O'CLOCK",
      hourWord: 'TEN_HR' // Updated to match our Grid Logic
    });
  });

  test('handles "PAST" logic (10:10)', () => {
    const time = createTime(10, 10);
    const result = timeToWords(time);
    expect(result).toEqual({
      minuteWord: 'TEN',
      relation: 'PAST',
      hourWord: 'TEN_HR' // Updated
    });
  });

  test('rounds minutes correctly (10:18 -> 10:20)', () => {
    const time = createTime(10, 18);
    const result = timeToWords(time);
    expect(result).toEqual({
      minuteWord: 'TWENTY',
      relation: 'PAST',
      hourWord: 'TEN_HR' // Updated
    });
  });

  test('handles "TO" logic (10:45 -> QUARTER TO ELEVEN)', () => {
    const time = createTime(10, 45);
    const result = timeToWords(time);
    expect(result).toEqual({
      minuteWord: 'QUARTER',
      relation: 'TO',
      hourWord: 'ELEVEN' 
    });
  });

  test('handles hour wrap-around (12:58 -> 1:00)', () => {
    const time = createTime(12, 58);
    const result = timeToWords(time);
    expect(result).toEqual({
      minuteWord: '',
      relation: "O'CLOCK",
      hourWord: 'ONE'
    });
  });

  // New test to verify FIVE_HR logic just in case
  test('handles 5:00 correctly (FIVE_HR)', () => {
    const time = createTime(5, 0);
    const result = timeToWords(time);
    expect(result).toEqual({
      minuteWord: '',
      relation: "O'CLOCK",
      hourWord: 'FIVE_HR' // Should be FIVE_HR, not FIVE
    });
  });
});