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
        flexDirection: 'column',
        borderRadius: 22, // Slightly increased radius for smoother look
        margin: 8,        // ADDED: Safety margin to prevent corner clipping
        padding: 8,       // Internal padding
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {CLOCK_GRID.map((row, rowIndex) => (
        <FlexWidget
          key={`row-${rowIndex}`}
          style={{
            flexDirection: 'row',
            width: 'match_parent',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {row.map((char, colIndex) => {
            const coordKey = `${rowIndex}-${colIndex}`;
            const isActive = activeCoords.includes(coordKey);

            return (
              <FlexWidget
                key={coordKey}
                style={{
                  flex: 1,
                  height: 'match_parent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TextWidget
                  text={char}
                  style={{
                    color: isActive ? '#00E5FF' : '#333333',
                    fontSize: 18,
                    fontWeight: isActive ? 'bold' : 'normal',
                    textAlign: 'center',
                  }}
                />
              </FlexWidget>
            );
          })}
        </FlexWidget>
      ))}
    </FlexWidget>
  );
}