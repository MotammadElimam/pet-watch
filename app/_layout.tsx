// Native imports

// Expo imports
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Platform, Pressable } from "react-native";

// Third-party imports
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Context imports
import { PetProvider } from "@/context/pet-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PetProvider>
        <Stack>
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen
            name="pet-details"
            options={({ navigation }) => ({
              title: "",
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
                    size={28}
                    color="#222"
                  />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="payment"
            options={({ navigation }) => ({
              title: "Payment",
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons
                    name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
                    size={28}
                    color="#222"
                  />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="location"
            options={({ navigation }) => ({
              title: "Location",
              headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons
                    name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
                    size={28}
                    color="#222"
                  />
                </Pressable>
              ),
            })}
          />
        </Stack>
      </PetProvider>
    </GestureHandlerRootView>
  );
}
