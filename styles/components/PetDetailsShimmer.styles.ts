import { StyleSheet } from "react-native";

export const petDetailsShimmerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    imageContainer: {
        position: "relative",
        height: 300,
        backgroundColor: "#f0f0f0",
    },
    imageShimmer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
    },
    shimmerOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    emojiShimmer: {
        width: 40,
        height: 40,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        marginRight: 12,
    },
    titleContainer: {
        flex: 1,
    },
    nameShimmer: {
        width: 120,
        height: 24,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 4,
    },
    breedShimmer: {
        width: 100,
        height: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    priceShimmer: {
        width: 60,
        height: 24,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    infoSection: {
        marginBottom: 24,
    },
    sectionTitleShimmer: {
        width: 80,
        height: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 16,
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    infoItem: {
        width: "48%",
    },
    infoLabelShimmer: {
        width: 60,
        height: 14,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 4,
    },
    infoValueShimmer: {
        width: 80,
        height: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    healthGrid: {
        flexDirection: "row",
        gap: 12,
    },
    healthItemShimmer: {
        flex: 1,
        height: 40,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    compatibilityContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    compatibilityTagShimmer: {
        width: 80,
        height: 32,
        backgroundColor: "#f0f0f0",
        borderRadius: 16,
    },
    adoptButtonShimmer: {
        height: 56,
        backgroundColor: "#f0f0f0",
        borderRadius: 12,
        marginTop: 16,
    },
    descriptionShimmer: {
        width: "100%",
        height: 60,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    locationTextShimmer: {
        width: "100%",
        height: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 12,
    },
    mapButtonShimmer: {
        width: 120,
        height: 40,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
}); 