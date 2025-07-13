import { StyleSheet } from "react-native";

export const shimmerCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
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
  content: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nameShimmer: {
    width: 120,
    height: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  priceShimmer: {
    width: 60,
    height: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  breedShimmer: {
    width: 100,
    height: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 4,
  },
  ageShimmer: {
    width: 80,
    height: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tagShimmer: {
    width: 60,
    height: 24,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
});
