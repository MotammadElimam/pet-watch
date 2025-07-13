// Native imports
import React from "react";
import { View } from "react-native";

// Third-party imports
import { LinearGradient } from "expo-linear-gradient";

// Style imports
import { petDetailsShimmerStyles as styles } from "@/styles";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const PetDetailsShimmer = () => {
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

    const renderEmojiShimmer = () => <View style={styles.emojiShimmer} />;

    const renderNameShimmer = () => <View style={styles.nameShimmer} />;

    const renderBreedShimmer = () => <View style={styles.breedShimmer} />;

    const renderPriceShimmer = () => <View style={styles.priceShimmer} />;

    const renderTitleContainer = () => (
        <View style={styles.titleContainer}>
            {renderNameShimmer()}
            {renderBreedShimmer()}
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            {renderEmojiShimmer()}
            {renderTitleContainer()}
            {renderPriceShimmer()}
        </View>
    );

    const renderInfoItemShimmer = () => (
        <View style={styles.infoItem}>
            <View style={styles.infoLabelShimmer} />
            <View style={styles.infoValueShimmer} />
        </View>
    );

    const renderInfoGrid = () => (
        <View style={styles.infoGrid}>
            {renderInfoItemShimmer()}
            {renderInfoItemShimmer()}
            {renderInfoItemShimmer()}
            {renderInfoItemShimmer()}
        </View>
    );

    const renderDetailsSection = () => (
        <View style={styles.infoSection}>
            <View style={styles.sectionTitleShimmer} />
            {renderInfoGrid()}
        </View>
    );

    const renderHealthItemShimmer = () => <View style={styles.healthItemShimmer} />;

    const renderHealthGrid = () => (
        <View style={styles.healthGrid}>
            {renderHealthItemShimmer()}
            {renderHealthItemShimmer()}
        </View>
    );

    const renderHealthSection = () => (
        <View style={styles.infoSection}>
            <View style={styles.sectionTitleShimmer} />
            {renderHealthGrid()}
        </View>
    );

    const renderCompatibilityTagShimmer = () => <View style={styles.compatibilityTagShimmer} />;

    const renderCompatibilityContainer = () => (
        <View style={styles.compatibilityContainer}>
            {renderCompatibilityTagShimmer()}
            {renderCompatibilityTagShimmer()}
            {renderCompatibilityTagShimmer()}
        </View>
    );

    const renderAboutSection = () => (
        <View style={styles.infoSection}>
            <View style={styles.sectionTitleShimmer} />
            <View style={styles.descriptionShimmer} />
        </View>
    );

    const renderCompatibilitySection = () => (
        <View style={styles.infoSection}>
            <View style={styles.sectionTitleShimmer} />
            {renderCompatibilityContainer()}
        </View>
    );

    const renderLocationSection = () => (
        <View style={styles.infoSection}>
            <View style={styles.sectionTitleShimmer} />
            <View style={styles.locationTextShimmer} />
            <View style={styles.mapButtonShimmer} />
        </View>
    );

    const renderAdoptButtonShimmer = () => <View style={styles.adoptButtonShimmer} />;

    // ----------------------------------- END: UI RENDER METHODS -----------------------------------------------

    return (
        <View style={styles.container}>
            {renderImageContainer()}
            <View style={styles.content}>
                {renderHeader()}
                {renderAboutSection()}
                {renderDetailsSection()}
                {renderHealthSection()}
                {renderCompatibilitySection()}
                {renderLocationSection()}
                {renderAdoptButtonShimmer()}
            </View>
        </View>
    );
};

export default PetDetailsShimmer; 