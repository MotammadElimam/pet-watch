// Native imports
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Expo imports
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

// Component imports
import { PaymentSheet } from "@/components/PaymentSheet";
import PetDetailsShimmer from "@/components/PetDetailsShimmer";

// Context imports
import { usePetContext } from "@/context/pet-context";

// Data imports
import { mockPets } from "@/data/mockPets";

// Types imports
import { Pet } from "@/types/pet";

// Style imports
import { petDetailsStyles as styles } from "@/styles";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const { adoptedPets } = usePetContext();
  const [loading, setLoading] = useState(true);
  const [showSimplePayment, setShowSimplePayment] = useState(false);

  const pet = mockPets.find((p) => p.id === petId) as Pet;
  const isAlreadyAdopted = adoptedPets.some(
    (adoptedPet) => adoptedPet.id === petId,
  );

  useEffect(() => {
    if (pet) {
      navigation.setOptions({
        title: pet.name,
        headerBackTitle: "",
      });
    }
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pet]);

  const handleAdopt = () => {
    Alert.alert("Adopt Pet", `Are you sure you want to adopt ${pet.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Adopt",
        onPress: () => setShowSimplePayment(true),
      },
    ]);
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

  // ----------------------------------- START: UI RENDER METHODS -----------------------------------------------

  const renderError = () => {
    if (!pet) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Pet not found</Text>
          </View>
        </SafeAreaView>
      );
    }
  };



  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.emoji}>{getPetIcon(pet.type)}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.breed}>{pet.breed}</Text>
        </View>
        <Text style={styles.price}>${pet.price}</Text>
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{pet.age} years</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{pet.gender}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>{pet.size}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Color</Text>
            <Text style={styles.infoValue}>{pet.color}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHealth = () => {
    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Health</Text>
        <View style={styles.healthGrid}>
          <View
            style={[
              styles.healthItem,
              { backgroundColor: pet.vaccinated ? "#E8F5E8" : "#FFEBEE" },
            ]}
          >
            <Text
              style={[
                styles.healthLabel,
                { color: pet.vaccinated ? "#2E7D32" : "#D32F2F" },
              ]}
            >
              {pet.vaccinated ? "✓ Vaccinated" : "✗ Not Vaccinated"}
            </Text>
          </View>
          <View
            style={[
              styles.healthItem,
              { backgroundColor: pet.neutered ? "#E8F5E8" : "#FFEBEE" },
            ]}
          >
            <Text
              style={[
                styles.healthLabel,
                { color: pet.neutered ? "#2E7D32" : "#D32F2F" },
              ]}
            >
              {pet.neutered ? "✓ Neutered" : "✗ Not Neutered"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCompatibility = () => {
    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Good With</Text>
        <View style={styles.compatibilityContainer}>
          {pet.goodWith.map((item, index) => (
            <View key={index} style={styles.compatibilityTag}>
              <Text style={styles.compatibilityText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderLocation = () => {
    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.locationText}>{pet.location.address}</Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() =>
            router.push(
              `/location?latitude=${pet.location.latitude}&longitude=${pet.location.longitude}&address=${encodeURIComponent(pet.location.address)}`,
            )
          }
        >
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSpecialNeeds = () => {
    if (pet.specialNeeds) {
      return (
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Special Needs</Text>
          <Text style={styles.specialNeeds}>{pet.specialNeeds}</Text>
        </View>
      );
    }
  };

  const renderAdoptButton = () => {
    if (isAlreadyAdopted) {
      return (
        <View style={[styles.adoptButton, styles.adoptButtonDisabled]}>
          <Text style={styles.adoptButtonText}>Already Adopted by You</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.adoptButton,
          !pet.isAvailable && styles.adoptButtonDisabled,
        ]}
        onPress={handleAdopt}
        disabled={!pet.isAvailable}
      >
        <Text style={styles.adoptButtonText}>
          {pet.isAvailable
            ? `Adopt ${pet.name} - $${pet.price}`
            : "Already Adopted"}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <PetDetailsShimmer />;
    }

    return (
      <View style={styles.content}>
        {renderHeader()}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About {pet.name}</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>

        {renderDetails()}
        {renderHealth()}
        {renderCompatibility()}
        {renderLocation()}
        {renderSpecialNeeds()}
        {renderAdoptButton()}
      </View>
    );
  };

  const renderMain = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          {!loading && <Image source={{ uri: pet.imageUrl }} style={styles.image} />}
          {renderContent()}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ----------------------------------- END: UI RENDER METHODS ----------------------------------------------- //

  if (!pet) return renderError();

  return (
    <>
      {renderMain()}
      <PaymentSheet
        petId={pet.id}
        visible={showSimplePayment}
        onClose={() => setShowSimplePayment(false)}
      />
    </>
  );
};

export default PetDetails;
