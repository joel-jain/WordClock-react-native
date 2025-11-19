import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../hooks/useTheme';
import { ClockGrid } from '../../components/Grid/Grid';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';

export const HomeScreen = () => {
  const { colors, isLoading } = useTheme();

  if (isLoading) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar Area */}
      <View style={styles.header}>
        <ThemeToggle />
      </View>

      {/* Main Clock Area */}
      <View style={styles.clockContainer}>
        <ClockGrid />
      </View>

      {/* Footer Area (Empty for now, balances the layout) */}
      <View style={styles.footer} />

      <StatusBar style={colors.statusBarStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60, // Space for status bar
    alignItems: 'flex-end', // Put toggle on the right
    paddingRight: 20,
  },
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 100, // Counter-balance the header height so clock stays centered
  },
});