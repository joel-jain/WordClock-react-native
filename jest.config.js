module.exports = {
  preset: 'jest-expo',
  // Update this line:
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect', 
    '<rootDir>/jest.setup.js' // Add this!
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
};