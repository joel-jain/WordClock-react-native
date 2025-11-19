export interface ThemeColors {
  background: string;
  text: string;
  textDim: string;
  accent: string;
  statusBarStyle: 'auto' | 'inverted' | 'light' | 'dark';
}

export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  text: '#000000',
  textDim: '#D3D3D3', // Light gray for inactive words
  accent: '#FF6347',  // Tomato red for active words
  statusBarStyle: 'dark',
};

export const darkColors: ThemeColors = {
  background: '#000000',
  text: '#FFFFFF',
  textDim: '#333333', // Dark gray for inactive words
  accent: '#00E5FF',  // Cyan for active words
  statusBarStyle: 'light',
};