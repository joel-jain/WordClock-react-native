import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Animation value: 0 for Light, 1 for Dark
  const animValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isDark ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  // Background Color of the Track
  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#3A3A3C'],
  });

  // Thumb Slide
  const thumbTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  // Icon Crossfade
  const sunOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const moonOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <Pressable 
      onPress={toggleTheme}
      hitSlop={10}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]} // modern tap feedback
    >
      <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View 
          style={[
            styles.thumb, 
            { transform: [{ translateX: thumbTranslate }] }
          ]}
        >
          {/* Sun Icon */}
          <Animated.View style={[styles.iconWrapper, { opacity: sunOpacity }]}>
            <Ionicons name="sunny" size={14} color="#FDB813" />
          </Animated.View>

          {/* Moon Icon */}
          <Animated.View 
            style={[
              styles.iconWrapper, 
              { opacity: moonOpacity, position: 'absolute' }
            ]}
          >
            <Ionicons name="moon" size={13} color="#c7bfbfff" />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 28,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
