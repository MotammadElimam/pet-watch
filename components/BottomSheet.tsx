// Native imports
import React, { useEffect } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

// Third-party imports
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Style imports
import { bottomSheetStyles as styles } from "@/styles";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ visible, onClose, children }: BottomSheetProps) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = 0;
    }
  }, [visible]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startY = translateY.value;
    },
    onActive: (event, context: any) => {
      const newTranslateY = context.startY + event.translationY;
      if (newTranslateY >= 0) {
        translateY.value = newTranslateY;
      }
    },
    onEnd: (event) => {
      if (event.translationY > 150 || event.velocityY > 500) {
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // ----------------------------------- START: UI RENDER METHODS -----------------------------------------------

  const renderBackdrop = () => (
    <TouchableOpacity
      style={styles.backdrop}
      activeOpacity={1}
      onPress={onClose}
    />
  );

  const renderHandle = () => <View style={styles.handle} />;

  const renderHandleContainer = () => (
    <Animated.View style={styles.handleContainer}>
      {renderHandle()}
    </Animated.View>
  );

  const renderGestureHandler = () => (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      {renderHandleContainer()}
    </PanGestureHandler>
  );

  const renderContentWrapper = () => (
    <View style={styles.contentWrapper}>{children}</View>
  );

  const renderContainer = () => (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderGestureHandler()}
      {renderContentWrapper()}
    </Animated.View>
  );

  const renderOverlay = () => (
    <View style={styles.overlay}>
      {renderBackdrop()}
      {renderContainer()}
    </View>
  );

  // ----------------------------------- END: UI RENDER METHODS -----------------------------------------------

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {renderOverlay()}
    </Modal>
  );
};

export { BottomSheet };
