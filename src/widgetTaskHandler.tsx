import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { WordClockWidget } from './widgets/WordClockwidget';
import { timeToWords } from './utils/timeUtils';
import { WORD_MAP } from './utils/clockData';

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  // 1. Calculate Time
  const now = new Date();
  const { hourWord, minuteWord, relation } = timeToWords(now);

  // 2. Calculate Active Coordinates
  const activeCoords: string[] = [];

  const addWord = (word: string) => {
    const coords = WORD_MAP[word];
    if (coords) {
      coords.forEach(([r, c]) => activeCoords.push(`${r}-${c}`));
    }
  };

  // Always light up "IT IS"
  addWord("IT");
  addWord("IS");
  
  // Light up dynamic words
  if (minuteWord) addWord(minuteWord);
  if (relation) addWord(relation);
  if (hourWord) addWord(hourWord);

  // 3. Render the Widget
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      props.renderWidget(<WordClockWidget activeCoords={activeCoords} />);
      break;
    
    default:
      break;
  }
}