// Native imports
import { View } from "react-native";

// Expo imports
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabScreenOptions = {
  tabBarActiveTintColor: "#FF6B35",
  tabBarInactiveTintColor: "#999",
  tabBarStyle: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingBottom: 12,
    paddingTop: 12,
    height: 95,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600" as const,
    marginTop: 2,
  },
  headerShown: false,
  headerBackTitle: "",
};

export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Browse",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "paw" : "paw-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-pets"
        options={{
          title: "My Pets",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ position: "relative" }}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
