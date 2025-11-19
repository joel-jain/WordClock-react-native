import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CLOCK_GRID, WORD_MAP } from '../../utils/clockData';
import { WordCell } from '../WordCell/WordCell';
import { useTime } from '../../hooks/useTime';

export const ClockGrid = () => {
  const { hourWord, minuteWord, relation } = useTime();

  // Set of active coordinates (format: "rowIndex-colIndex")
  const activeCoords = new Set<string>();

  // Helper to look up a word in the map and add its coordinates to the set
  const addWordToActive = (word: string) => {
    const coords = WORD_MAP[word];
    if (coords) {
      coords.forEach(([row, col]) => {
        activeCoords.add(`${row}-${col}`);
      });
    }
  };

  // Always active words
  addWordToActive("IT");
  addWordToActive("IS");
  
  // Dynamic words from time logic
  if (minuteWord) addWordToActive(minuteWord);
  if (relation) addWordToActive(relation);
  if (hourWord) addWordToActive(hourWord);

  return (
    <View style={styles.container}>
      {CLOCK_GRID.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((char, colIndex) => {
            const isActive = activeCoords.has(`${rowIndex}-${colIndex}`);
            return (
              <WordCell 
                key={`${rowIndex}-${colIndex}`} 
                char={char} 
                active={isActive} 
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2, // Spacing between rows
  },
});