import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface WordCellProps {
  char: string;
  active: boolean;
}

const { width } = Dimensions.get('window');
const CELL_SIZE = width / 13; // Calculate size to fit screen

export const WordCell: React.FC<WordCellProps> = ({ char, active }) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        styles.cell,
        {
          color: active ? colors.accent : colors.textDim,
          fontWeight: active ? 'bold' : 'normal',
          textShadowColor: active ? colors.accent : 'transparent',
          textShadowRadius: active ? 10 : 0,
        },
      ]}
    >
      {char}
    </Text>
  );
};

const styles = StyleSheet.create({
  cell: {
    fontSize: 18,
    width: CELL_SIZE,
    height: CELL_SIZE,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 1,
  },
});