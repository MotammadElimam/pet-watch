// Native imports
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Types imports
import { Pet } from "@/types/pet";

// Style imports
import { petCardStyles as styles } from "@/styles";

interface PetCardProps {
  pet: Pet;
  onPress: (pet: Pet) => void;
  adoptedByMe?: boolean;
}

const PetCard = React.memo(({ pet, onPress, adoptedByMe }: PetCardProps) => {
  const fallbackImageUrl =
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop";

  // ----------------------------------- START: UI RENDER METHODS -----------------------------------------------

  const renderError = () => {
    if (!pet) {
      return (
        <View style={styles.card}>
          <Text style={styles.errorText}>No pet data available</Text>
        </View>
      );
    }
  };

  const renderPetImage = () => (
    <Image
      source={{ uri: pet.imageUrl || fallbackImageUrl }}
      style={styles.image}
      defaultSource={{ uri: fallbackImageUrl }}
      onError={(error) => {
        // Image loading error handled silently
      }}
    />
  );

  const renderPetName = () => (
    <Text style={styles.name}>{pet.name || "Unknown Pet"}</Text>
  );

  const renderPetBreed = () => (
    <Text style={styles.breed}>{pet.breed || "Unknown Breed"}</Text>
  );

  const renderPetAge = () => (
    <Text style={styles.detail}>{pet.age || 0} years old</Text>
  );

  const renderPetGender = () => (
    <Text style={styles.detail}>{pet.gender || "Unknown"}</Text>
  );

  const renderPetSize = () => (
    <Text style={styles.detail}>{pet.size || "Unknown"}</Text>
  );

  const renderPetDetails = () => (
    <View style={styles.details}>
      {renderPetAge()}
      <Text style={styles.detail}>•</Text>
      {renderPetGender()}
      <Text style={styles.detail}>•</Text>
      {renderPetSize()}
    </View>
  );

  const renderPetPrice = () => (
    <Text style={styles.price}>${pet.price || 0}</Text>
  );

  const getAvailabilityColor = () => {
    if (adoptedByMe) return "#1976D2";
    return pet.isAvailable ? "#4CAF50" : "#F44336";
  };

  const getAvailabilityText = () => {
    if (adoptedByMe) return "Adopted by You";
    return pet.isAvailable ? "Available" : "Adopted";
  };

  const renderAvailability = () => (
    <View
      style={[styles.availability, { backgroundColor: getAvailabilityColor() }]}
    >
      <Text style={styles.availabilityText}>{getAvailabilityText()}</Text>
    </View>
  );

  const renderPriceContainer = () => (
    <View style={styles.priceContainer}>
      {renderPetPrice()}
      {renderAvailability()}
    </View>
  );

  const renderContent = () => (
    <View style={styles.content}>
      {renderPetName()}
      {renderPetBreed()}
      {renderPetDetails()}
      {renderPriceContainer()}
    </View>
  );

  const renderCard = () => (
    <TouchableOpacity style={styles.card} onPress={() => onPress(pet)}>
      {renderPetImage()}
      {renderContent()}
    </TouchableOpacity>
  );

  // ----------------------------------- END: UI RENDER METHODS -----------------------------------------------

  if (!pet) return renderError();

  return renderCard();
});

export default PetCard;
