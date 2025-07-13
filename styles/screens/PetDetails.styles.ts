import { StyleSheet } from "react-native";

export const petDetailsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  emoji: {
    fontSize: 40,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  breed: {
    fontSize: 16,
    color: "#666",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2196F3",
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  healthGrid: {
    flexDirection: "row",
    gap: 12,
  },
  healthItem: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  healthLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  compatibilityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  compatibilityTag: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  compatibilityText: {
    color: "#1976D2",
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  locationText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  mapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  specialNeeds: {
    fontSize: 16,
    color: "#D32F2F",
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
  },
  adoptButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  adoptButtonDisabled: {
    backgroundColor: "#ccc",
  },
  adoptButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
