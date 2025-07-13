export interface Pet {
  id: string;
  name: string;
  type: "dog" | "cat" | "bird" | "rabbit" | "fish";
  breed: string;
  age: number;
  gender: "male" | "female";
  size: "small" | "medium" | "large";
  color: string;
  description: string;
  imageUrl: string;
  price: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isAvailable: boolean;
  vaccinated: boolean;
  neutered: boolean;
  goodWith: string[];
  specialNeeds?: string;
}
