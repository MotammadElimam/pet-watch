import { StyleSheet } from "react-native";

export const petCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  breed: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: "#888",
    marginRight: 8,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
  },
  availability: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  availabilityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
    padding: 20,
  },
});
