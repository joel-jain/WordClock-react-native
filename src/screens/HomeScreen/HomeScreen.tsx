import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { ClockGrid } from '../../components/Grid/Grid';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { OptionsModal } from '../../components/OptionsModal/OptionsModal';

export const HomeScreen = () => {
  const { colors, isLoading } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  if (isLoading) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar Area */}
      <View style={styles.header}>
        {/* Options Button (Left) */}
        <Pressable 
          onPress={() => setModalVisible(true)}
          hitSlop={10}
          style={({ pressed }) => [
            styles.iconButton,
            // Apply the border color from your snippet, or dynamic if preferred
            { borderColor: colors.textDim }, 
            pressed && { 
              backgroundColor: 'rgba(128, 128, 128, 0.2)', // Grey background on press
            }
          ]}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </Pressable>

        {/* Theme Toggle (Right) */}
        <ThemeToggle />
      </View>

      {/* Main Clock Area */}
      <View style={styles.clockContainer}>
        <ClockGrid />
      </View>

      {/* Footer Area */}
      <View style={styles.footer} />

      <StatusBar style={colors.statusBarStyle} />

      {/* Options Modal */}
      <OptionsModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Round shape
    borderWidth: 1,   // Add border width
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 100,
  },
});