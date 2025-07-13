// Native imports
import React, { createContext, useContext, useEffect, useState } from "react";

// Third-party imports
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types imports
import { Pet } from "@/types/pet";

const STORAGE_KEY = "adoptedPets";

interface PetContextType {
  adoptedPets: Pet[];
  adoptPet: (pet: Pet) => void;
  removePet: (petId: string) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adoptedPets, setAdoptedPets] = useState<Pet[]>([]);

  // Load adopted pets from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setAdoptedPets(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load adopted pets:", e);
      }
    })();
  }, []);

  // Save adopted pets to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(adoptedPets)).catch(
      (e) => {
        console.error("Failed to save adopted pets:", e);
      },
    );
  }, [adoptedPets]);

  const adoptPet = (pet: Pet) => {
    setAdoptedPets((prev) => {
      if (prev.find((p) => p.id === pet.id)) return prev;
      return [...prev, { ...pet, isAvailable: false }];
    });
  };

  const removePet = (petId: string) => {
    setAdoptedPets((prev) => prev.filter((pet) => pet.id !== petId));
  };

  return (
    <PetContext.Provider value={{ adoptedPets, adoptPet, removePet }}>
      {children}
    </PetContext.Provider>
  );
};

export function usePetContext() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePetContext must be used within a PetProvider");
  return ctx;
}
