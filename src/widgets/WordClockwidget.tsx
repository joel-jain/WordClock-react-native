import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';
import { CLOCK_GRID } from '../utils/clockData';

interface WordClockWidgetProps {
  activeCoords: string[];
}

export function WordClockWidget({ activeCoords }: WordClockWidgetProps) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 4,
        borderRadius: 16,
      }}
    >
      {CLOCK_GRID.map((row, rowIndex) => (
        <FlexWidget
          key={`row-${rowIndex}`}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {row.map((char, colIndex) => {
            const coordKey = `${rowIndex}-${colIndex}`;
            const isActive = activeCoords.includes(coordKey);

            return (
              <TextWidget
                key={coordKey}
                text={char}
                style={{
                  color: isActive ? '#00E5FF' : '#333333', // Cyan vs Dark Gray
                  fontSize: 12, // Slightly smaller to fit safely
                  fontWeight: isActive ? 'bold' : 'normal',
                  width: 16,    // Fixed width for alignment
                  textAlign: 'center',
                }}
              />
            );
          })}
        </FlexWidget>
      ))}
    </FlexWidget>
  );
}