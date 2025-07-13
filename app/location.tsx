// Native imports
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Expo imports
import * as ExpoLocation from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";

// Style imports
import { locationStyles as styles } from "@/styles";
// Utils imports
import { calculateDistance } from "@/utils/locationUtils";
import MapView, { Marker } from "react-native-maps";

// ----------------------------------- TYPES -----------------------------------
interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

// ----------------------------------- COMPONENT -----------------------------------
const LocationScreen: React.FC = () => {
  // ----------------------------------- STATE & PARAMS -----------------------------------
  const { latitude, longitude, address } = useLocalSearchParams();
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const petLocation: Location = {
    latitude: parseFloat(latitude as string),
    longitude: parseFloat(longitude as string),
    address: address as string,
  };

  // ----------------------------------- EFFECTS -----------------------------------
  useEffect(() => {
    const getUserLocation = async () => {
      setIsLoadingLocation(true);
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserLocation(null);
        setIsLoadingLocation(false);
        Alert.alert(
          "Permission denied",
          "Location permission is required to show your location.",
        );
        return;
      }
      const location = await ExpoLocation.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: "Your Current Location", // Optionally use reverse geocoding for real address
      });
      setIsLoadingLocation(false);
    };
    getUserLocation();
  }, []);

  // ----------------------------------- UTILS ----------------------------------- //
  const distance = userLocation
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        petLocation.latitude,
        petLocation.longitude,
      )
    : null;

  // Helper to open maps with directions
  const openMapsDirections = () => {
    const destLat = petLocation.latitude;
    const destLng = petLocation.longitude;
    let url = "";
    if (Platform.OS === "ios") {
      url = `http://maps.apple.com/?daddr=${destLat},${destLng}`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}`;
    }
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open the maps application.");
    });
  };

  // Helper to get region that fits both points
  const getMapRegion = () => {
    if (!userLocation) {
      return {
        latitude: petLocation.latitude,
        longitude: petLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }
    const minLat = Math.min(userLocation.latitude, petLocation.latitude);
    const maxLat = Math.max(userLocation.latitude, petLocation.latitude);
    const minLng = Math.min(userLocation.longitude, petLocation.longitude);
    const maxLng = Math.max(userLocation.longitude, petLocation.longitude);
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: Math.max(0.05, Math.abs(maxLat - minLat) * 2),
      longitudeDelta: Math.max(0.05, Math.abs(maxLng - minLng) * 2),
    };
  };

  // ----------------------------------- START: UI RENDER METHODS ----------------------------------------------- //

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Location</Text>
      <Text style={styles.subtitle}>Pet location and directions</Text>
    </View>
  );

  const renderPetLocationCard = () => (
    <View style={styles.locationCard}>
      <Text style={styles.cardTitle}>Pet Location</Text>
      <Text style={styles.address}>{petLocation.address}</Text>
      <View style={styles.coordinates}>
        <Text style={styles.coordinateText}>
          Lat: {petLocation.latitude.toFixed(6)}
        </Text>
        <Text style={styles.coordinateText}>
          Long: {petLocation.longitude.toFixed(6)}
        </Text>
      </View>
    </View>
  );

  const renderUserLocationCard = () => (
    <View style={styles.locationCard}>
      <Text style={styles.cardTitle}>Your Location</Text>
      {isLoadingLocation ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#2196F3" />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      ) : userLocation ? (
        <>
          <Text style={styles.address}>{userLocation.address}</Text>
          <View style={styles.coordinates}>
            <Text style={styles.coordinateText}>
              Lat: {userLocation.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordinateText}>
              Long: {userLocation.longitude.toFixed(6)}
            </Text>
          </View>
          {distance && (
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceLabel}>Distance to pet:</Text>
              <Text style={styles.distanceValue}>{distance} km</Text>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.errorText}>Unable to get your location</Text>
      )}
    </View>
  );

  const renderMap = () => (
    <View style={styles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        region={getMapRegion()}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={true}
        loadingEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: petLocation.latitude,
            longitude: petLocation.longitude,
          }}
          title="Pet Location"
          description={petLocation.address}
          pinColor="#FF6B35"
        />
      </MapView>
    </View>
  );

  const renderMapSection = () => (
    <View style={styles.mapSection}>
      <Text style={styles.sectionTitle}>Map View</Text>
      {renderMap()}
    </View>
  );

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={openMapsDirections}
      >
        <Text style={styles.actionButtonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  // ----------------------------------- END: UI RENDER METHODS ----------------------------------------------- //

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {renderHeader()}
        {renderPetLocationCard()}
        {renderUserLocationCard()}
        {renderMapSection()}
        {renderActions()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationScreen;
