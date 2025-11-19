import { useState, useEffect } from 'react';
import { timeToWords } from '../utils/timeUtils';

export const useTime = () => {
  const [timeWords, setTimeWords] = useState(timeToWords(new Date()));

  useEffect(() => {
    // Update immediately on mount
    const tick = () => {
      setTimeWords(timeToWords(new Date()));
    };

    // Update every 10 seconds to catch minute changes quickly
    // (We don't need 1000ms precision for a fuzzy clock)
    const timer = setInterval(tick, 10000);

    return () => clearInterval(timer);
  }, []);

  return timeWords;
};