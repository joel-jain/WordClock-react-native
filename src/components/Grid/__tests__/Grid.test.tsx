import React from 'react';
import { render } from '@testing-library/react-native';
import { ClockGrid } from '../Grid';

// 1. Mock useTime (so the letters don't change)
jest.mock('../../../hooks/useTime', () => ({
  useTime: () => ({
    hourWord: 'TEN_HR',
    minuteWord: 'TEN',
    relation: 'PAST'
  }),
}));

// 2. Mock useTheme (so WordCell can get colors without a Provider)
jest.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({
    colors: {
      text: '#000000',
      textDim: '#333333',
      accent: '#FF6347'
    }
  }),
}));

describe('ClockGrid Component', () => {
  test('renders the full grid correctly', () => {
    const { toJSON } = render(<ClockGrid />);
    expect(toJSON()).toMatchSnapshot();
  });
});