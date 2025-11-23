// jest.setup.js

// 1. Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// 2. Mock TurboModuleRegistry to fix "DevMenu" and "SettingsManager" missing errors
// This is required because jest.requireActual('react-native') tries to initialize native modules
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  const turboModuleRegistry = jest.requireActual(
    'react-native/Libraries/TurboModule/TurboModuleRegistry',
  );
  return {
    ...turboModuleRegistry,
    getEnforcing: (name) => {
      // DevMenu is missing in the test environment
      if (name === 'DevMenu') {
        return null;
      }
      // SettingsManager is missing in the test environment (used by Platform/Settings)
      if (name === 'SettingsManager') {
        return {
          settings: {},
          getConstants: () => ({
            settings: {},
          }),
        };
      }
      return turboModuleRegistry.getEnforcing(name);
    },
  };
});

// 3. Mock Animated to run immediately (Synchronously)
// This prevents "act(...)" warnings by skipping the animation duration
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  const mockAnimation = (value, config) => ({
    start: (callback) => {
      // Apply the end value immediately
      value.setValue(config.toValue);
      // Trigger the completion callback
      if (callback) {
        callback({ finished: true });
      }
    },
  });

  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      timing: mockAnimation,
      spring: mockAnimation,
      parallel: (animations) => ({
        start: (callback) => {
          animations.forEach(a => a.start());
          if (callback) callback({ finished: true });
        }
      }),
      sequence: (animations) => ({
        start: (callback) => {
          animations.forEach(a => a.start());
          if (callback) callback({ finished: true });
        }
      }),
    },
  };
});