// Native imports
import React from "react";
import { View } from "react-native";

// Third-party imports
import { LinearGradient } from "expo-linear-gradient";

// Style imports
import { shimmerCardStyles as styles } from "@/styles";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ShimmerCard = () => {
  const shimmerValue = useSharedValue(0);

  React.useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 800 }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerValue.value, [0, 1], [-200, 200]);

    return {
      transform: [{ translateX }],
    };
  });

  // ----------------------------------- START: UI RENDER METHODS -----------------------------------------------

  const renderGradient = () => (
    <LinearGradient
      colors={["transparent", "rgba(255, 255, 255, 0.4)", "transparent"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    />
  );

  const renderShimmerOverlay = () => (
    <Animated.View style={[styles.shimmerOverlay, animatedStyle]}>
      {renderGradient()}
    </Animated.View>
  );

  const renderImageShimmer = () => <View style={styles.imageShimmer} />;

  const renderImageContainer = () => (
    <View style={styles.imageContainer}>
      {renderImageShimmer()}
      {renderShimmerOverlay()}
    </View>
  );

  const renderNameShimmer = () => <View style={styles.nameShimmer} />;

  const renderPriceShimmer = () => <View style={styles.priceShimmer} />;

  const renderNameContainer = () => (
    <View style={styles.nameContainer}>
      {renderNameShimmer()}
      {renderPriceShimmer()}
    </View>
  );

  const renderBreedShimmer = () => <View style={styles.breedShimmer} />;

  const renderAgeShimmer = () => <View style={styles.ageShimmer} />;

  const renderTagShimmer = () => <View style={styles.tagShimmer} />;

  const renderTagsContainer = () => (
    <View style={styles.tagsContainer}>
      {renderTagShimmer()}
      {renderTagShimmer()}
    </View>
  );

  const renderContent = () => (
    <View style={styles.content}>
      {renderNameContainer()}
      {renderBreedShimmer()}
      {renderAgeShimmer()}
      {renderTagsContainer()}
    </View>
  );

  // ----------------------------------- END: UI RENDER METHODS -----------------------------------------------

  return (
    <View style={styles.card}>
      {renderImageContainer()}
      {renderContent()}
    </View>
  );
};

export default ShimmerCard;
