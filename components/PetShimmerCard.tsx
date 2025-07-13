// Native imports
import React from "react";
import { View } from "react-native";

// Third-party imports
import { LinearGradient } from "expo-linear-gradient";

// Style imports
import { petShimmerCardStyles as styles } from "@/styles";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const PetShimmerCard = () => {
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

    const renderPetNameShimmer = () => <View style={styles.petNameShimmer} />;

    const renderPetBreedShimmer = () => <View style={styles.petBreedShimmer} />;

    const renderPetTitleContainer = () => (
        <View style={styles.petTitleContainer}>
            {renderPetNameShimmer()}
            {renderPetBreedShimmer()}
        </View>
    );

    const renderPetAgeShimmer = () => <View style={styles.petAgeShimmer} />;

    const renderPetGenderShimmer = () => <View style={styles.petGenderShimmer} />;

    const renderPetColorShimmer = () => <View style={styles.petColorShimmer} />;

    const renderPetDetails = () => (
        <View style={styles.petDetails}>
            {renderPetAgeShimmer()}
            {renderPetGenderShimmer()}
            {renderPetColorShimmer()}
        </View>
    );

    const renderViewButtonShimmer = () => <View style={styles.viewButtonShimmer} />;

    const renderRemoveButtonShimmer = () => <View style={styles.removeButtonShimmer} />;

    const renderPetActions = () => (
        <View style={styles.petActions}>
            {renderViewButtonShimmer()}
            {renderRemoveButtonShimmer()}
        </View>
    );

    const renderPetInfo = () => (
        <View style={styles.petInfo}>
            {renderPetTitleContainer()}
            {renderPetDetails()}
            {renderPetActions()}
        </View>
    );

    // ----------------------------------- END: UI RENDER METHODS -----------------------------------------------

    return (
        <View style={styles.petCard}>
            {renderImageContainer()}
            {renderPetInfo()}
        </View>
    );
};

export default PetShimmerCard; 