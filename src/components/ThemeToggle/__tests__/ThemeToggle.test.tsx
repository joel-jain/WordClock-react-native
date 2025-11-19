import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeToggle } from '../ThemeToggle';

// 1. Mock the useTheme hook
// We hijack the hook so we don't need the real Context/Storage
jest.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: mockToggle,
    colors: { 
      background: '#FFF', 
      text: '#000',
      accent: '#FF6347' 
    }
  }),
}));

// Create a fake function to track clicks
const mockToggle = jest.fn();

describe('ThemeToggle Component', () => {
  
  beforeEach(() => {
    // Reset the fake function before each test
    mockToggle.mockClear();
  });

  test('renders correctly', () => {
    const { toJSON } = render(<ThemeToggle />);
    // Create a snapshot (a text picture of the component structure)
    expect(toJSON()).toMatchSnapshot();
  });

  test('calls toggleTheme when pressed', () => {
    const { getByRole } = render(<ThemeToggle />);
    
    // The Pressable in ThemeToggle doesn't have a role explicitly set,
    // so we might need to find it by valid accessibility traits or just the root.
    // Since our component is wrapped in Pressable, checking logic:
    
    // Actually, finding by accessibility hint or blindly firing on root is easier.
    // Let's assume the user taps the switch.
    // Since we didn't add testID, we will update the component slightly in a sec,
    // BUT for now, let's try to find it by the implicit "button" role usually assigned to Pressables.
    
    // Alternative: Render, then find the element.
    const { root } = render(<ThemeToggle />);
    
    // Simulate a press on the button
    fireEvent.press(root);

    // Did our fake function get called?
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});