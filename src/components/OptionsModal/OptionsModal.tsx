import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const OptionsModal: React.FC<OptionsModalProps> = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  
  // 1. Internal state controls whether the Modal component is actually rendered
  const [showModal, setShowModal] = useState(visible);
  
  // 2. Animated Values
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  // Calculate Translation Offsets
  // We want the modal to start at the button position and move to the center.
  // Button Position approx: X=32 (20 padding + 12 half-icon), Y=72 (60 padding + 12 half-icon)
  // Screen Center: width/2, height/2
  const buttonX = 32;
  const buttonY = 72;
  const startX = buttonX - width / 2;
  const startY = buttonY - height / 2;

  const translateX = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startX, 0],
  });

  const translateY = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startY, 0],
  });

  // 3. Effect to handle VISIBILITY changes from parent
  useEffect(() => {
    if (visible) {
      setShowModal(true); // Mount the modal immediately
    } else {
      // When closing, play exit animation FIRST, then unmount
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.quad), // Accelerate out
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false); // Unmount after animation is done
      });
    }
  }, [visible]);

  // 4. Effect to handle ENTRY animation when modal mounts
  useEffect(() => {
    if (showModal) {
      // Reset values to 0 before animating in
      opacityValue.setValue(0);
      scaleValue.setValue(0);

      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.quad), // Decelerate in
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showModal]);

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
      animationType="none"
    >
      <View style={styles.centeredView}>
        {/* Animated Backdrop */}
        <Animated.View 
          style={[
            styles.backdrop, 
            { opacity: opacityValue }
          ]} 
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        {/* Animated Content */}
        <Animated.View 
          style={[
            styles.modalView, 
            { 
              backgroundColor: colors.background, 
              borderColor: colors.textDim,
              shadowColor: colors.text,
              opacity: opacityValue,
              transform: [
                { translateX }, 
                { translateY }, 
                { scale: scaleValue }
              ]
            }
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>Options</Text>
          
          <Text style={[styles.placeholderText, { color: colors.textDim }]}>
            More settings coming soon...
          </Text>

          {/* Close Button */}
          <Pressable
            style={({ pressed }) => [
              styles.button, 
              { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={onClose}
          >
            <Text style={[styles.textStyle, { color: colors.background }]}>Close</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  placeholderText: {
    marginBottom: 25,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});