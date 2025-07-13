// Native imports
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Expo imports
import { useRouter } from "expo-router";

// Context imports
import { usePetContext } from "@/context/pet-context";

// Types imports
import { Pet } from "@/types/pet";

// Style imports
import { myPetsStyles as styles } from "@/styles";

const MyPets = () => {
  const router = useRouter();
  const { adoptedPets, removePet } = usePetContext();

  const handlePetPress = (pet: Pet) => {
    router.push(`/pet-details?petId=${pet.id}`);
  };

  const handleRemovePet = (pet: Pet) => {
    Alert.alert(
      "Remove Pet",
      `Are you sure you want to remove ${pet.name} from your pets?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removePet(pet.id);
            Alert.alert(
              "Success",
              `${pet.name} has been removed from your pets.`,
            );
          },
        },
      ],
    );
  };

  const getPetIcon = (type: string) => {
    switch (type) {
      case "dog":
        return "🐕";
      case "cat":
        return "🐱";
      case "bird":
        return "🐦";
      case "rabbit":
        return "🐰";
      case "fish":
        return "🐠";
      default:
        return "🐾";
    }
  };

  // ----------------------------------- START: UI RENDER METHODS ----------------------------------------------- //

  const renderPetName = (item: Pet) => (
    <Text style={styles.petName}>
      {getPetIcon(item.type)} {item.name}
    </Text>
  );

  const renderPetBreed = (item: Pet) => (
    <Text style={styles.petBreed}>{item.breed}</Text>
  );

  const renderPetTitle = (item: Pet) => (
    <View style={styles.petTitleContainer}>
      {renderPetName(item)}
      {renderPetBreed(item)}
    </View>
  );

  const renderPetAge = (item: Pet) => (
    <Text style={styles.petDetail}>Age: {item.age} years</Text>
  );

  const renderPetGender = (item: Pet) => (
    <Text style={styles.petDetail}>Gender: {item.gender}</Text>
  );

  const renderPetColor = (item: Pet) => (
    <Text style={styles.petColor}>Color: {item.color}</Text>
  );

  const renderPetDetails = (item: Pet) => (
    <View style={styles.petDetails}>
      {renderPetAge(item)}
      {renderPetGender(item)}
      {renderPetColor(item)}
    </View>
  );

  const renderViewButton = (item: Pet) => (
    <TouchableOpacity
      style={styles.viewButton}
      onPress={() => handlePetPress(item)}
    >
      <Text style={styles.viewButtonText}>View Details</Text>
    </TouchableOpacity>
  );

  const renderRemoveButton = (item: Pet) => (
    <TouchableOpacity
      style={styles.healthButton}
      onPress={() => handleRemovePet(item)}
    >
      <Text style={styles.healthButtonText}>Remove</Text>
    </TouchableOpacity>
  );

  const renderPetActions = (item: Pet) => (
    <View style={styles.petActions}>
      {renderViewButton(item)}
      {renderRemoveButton(item)}
    </View>
  );

  const renderPetImage = (item: Pet) => (
    <View style={styles.petImageContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
    </View>
  );

  const renderPetInfo = (item: Pet) => (
    <View style={styles.petInfo}>
      {renderPetTitle(item)}
      {renderPetDetails(item)}
      {renderPetActions(item)}
    </View>
  );

  const renderPetCard = ({ item }: { item: Pet }) => (
    <View style={styles.petCard}>
      {renderPetImage(item)}
      {renderPetInfo(item)}
    </View>
  );

  const renderTitle = () => <Text style={styles.title}>My Pets</Text>;

  const renderSubtitle = () => (
    <Text style={styles.subtitle}>
      {adoptedPets.length} {adoptedPets.length === 1 ? "pet" : "pets"} in your
      family
    </Text>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {renderTitle()}
      {renderSubtitle()}
    </View>
  );

  const renderEmptyEmoji = () => <Text style={styles.emptyEmoji}>🐾</Text>;

  const renderEmptyTitle = () => (
    <Text style={styles.emptyTitle}>No pets yet</Text>
  );

  const renderEmptySubtitle = () => (
    <Text style={styles.emptySubtitle}>
      Start your journey by adopting a pet from our collection!
    </Text>
  );

  const renderBrowseButton = () => (
    <TouchableOpacity style={styles.adoptButton} onPress={() => router.back()}>
      <Text style={styles.adoptButtonText}>Browse Pets</Text>
    </TouchableOpacity>
  );

  const renderEmptyContent = () => (
    <View style={styles.emptyContainer}>
      {renderEmptyEmoji()}
      {renderEmptyTitle()}
      {renderEmptySubtitle()}
      {renderBrowseButton()}
    </View>
  );

  const renderPetList = () => (
    <FlatList
      data={adoptedPets}
      renderItem={renderPetCard}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );

  const renderMainContent = () => {
    if (adoptedPets.length === 0) {
      return renderEmptyContent();
    }
    return renderPetList();
  };

  const renderContainer = () => (
    <View style={styles.container}>
      {renderHeader()}
      {renderMainContent()}
    </View>
  );

  // ----------------------------------- END: UI RENDER METHODS ----------------------------------------------- //

  return (
    <SafeAreaView style={styles.safeArea}>{renderContainer()}</SafeAreaView>
  );
};

export default MyPets;
