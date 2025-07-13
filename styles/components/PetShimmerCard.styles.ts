import { StyleSheet } from "react-native";

export const petShimmerCardStyles = StyleSheet.create({
    petCard: {
        backgroundColor: "white",
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: 200,
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
    petInfo: {
        padding: 16,
    },
    petTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    petNameShimmer: {
        width: 120,
        height: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginRight: 8,
    },
    petBreedShimmer: {
        width: 80,
        height: 14,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    petDetails: {
        marginBottom: 16,
    },
    petAgeShimmer: {
        width: 100,
        height: 14,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 4,
    },
    petGenderShimmer: {
        width: 120,
        height: 14,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        marginBottom: 4,
    },
    petColorShimmer: {
        width: 90,
        height: 14,
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
    },
    petActions: {
        flexDirection: "row",
        gap: 12,
    },
    viewButtonShimmer: {
        flex: 1,
        height: 44,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    removeButtonShimmer: {
        flex: 1,
        height: 44,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
}); 