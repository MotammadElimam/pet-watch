// Native imports
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Expo imports
import { useRouter } from "expo-router";

// Context imports
import { usePetContext } from "@/context/pet-context";

// Data imports
import { mockPets } from "@/data/mockPets";

// Types imports
import { Pet } from "@/types/pet";

// Component imports
import { BottomSheet } from "./BottomSheet";

// Style imports
import { paymentSheetStyles as styles } from "@/styles";

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface PaymentSheetProps {
  petId: string;
  visible: boolean;
  onClose: () => void;
}

const PaymentSheet = ({ petId, visible, onClose }: PaymentSheetProps) => {
  const router = useRouter();
  const { adoptPet } = usePetContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<PaymentForm>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [pet, setPet] = React.useState<Pet | null>(null);

  React.useEffect(() => {
    const foundPet = mockPets.find((p) => p.id === petId);
    setPet(foundPet || null);
  }, [petId]);

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    const formatted = groups ? groups.join(" ") : cleaned;
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return formatted;
  };

  const validateForm = (): boolean => {
    if (!form.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      Alert.alert("Error", "Please enter a valid 16-digit card number");
      return false;
    }
    if (!form.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      Alert.alert("Error", "Please enter a valid expiry date (MM/YY)");
      return false;
    }
    if (!form.cvv.match(/^\d{3}$/)) {
      Alert.alert("Error", "Please enter a valid 3-digit CVV");
      return false;
    }
    if (!form.cardholderName.trim()) {
      Alert.alert("Error", "Please enter the cardholder name");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);

    if (pet) adoptPet(pet);

    Alert.alert(
      "Payment Successful! 🎉",
      `Congratulations! You have successfully adopted ${pet?.name}. You will receive a confirmation email shortly.`,
      [
        {
          text: "OK",
          onPress: () => {
            onClose();
            setTimeout(() => {
              router.replace("/tabs");
            }, 300);
          },
        },
      ],
    );
  };

  const handleClose = () => {
    onClose();
  };

  // ----------------------------------- START: UI RENDER METHODS -----------------------------------------------

  if (!pet) return null;

  const renderTitle = () => <Text style={styles.title}>Adopt {pet.name}</Text>;

  const renderSubtitle = () => (
    <Text style={styles.subtitle}>Complete your adoption</Text>
  );

  const renderPetName = () => (
    <Text style={styles.petName}>
      {pet.name} - {pet.breed}
    </Text>
  );

  const renderPetPrice = () => (
    <Text style={styles.petPrice}>Adoption Fee: ${pet.price}</Text>
  );

  const renderPetSummary = () => (
    <View style={styles.petSummary}>
      {renderPetName()}
      {renderPetPrice()}
    </View>
  );

  const renderSectionTitle = () => (
    <Text style={styles.sectionTitle}>Payment Information</Text>
  );

  const renderCardNumberLabel = () => (
    <Text style={styles.label}>Card Number</Text>
  );

  const renderCardNumberInput = () => (
    <TextInput
      style={styles.input}
      value={form.cardNumber}
      onChangeText={(text: string) =>
        handleInputChange("cardNumber", formatCardNumber(text))
      }
      placeholder="1234 5678 9012 3456"
      keyboardType="numeric"
      maxLength={19}
    />
  );

  const renderCardNumberGroup = () => (
    <View style={styles.inputGroup}>
      {renderCardNumberLabel()}
      {renderCardNumberInput()}
    </View>
  );

  const renderExpiryLabel = () => <Text style={styles.label}>Expiry Date</Text>;

  const renderExpiryInput = () => (
    <TextInput
      style={styles.input}
      value={form.expiryDate}
      onChangeText={(text: string) =>
        handleInputChange("expiryDate", formatExpiryDate(text))
      }
      placeholder="MM/YY"
      keyboardType="numeric"
      maxLength={5}
    />
  );

  const renderExpiryGroup = () => (
    <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
      {renderExpiryLabel()}
      {renderExpiryInput()}
    </View>
  );

  const renderCvvLabel = () => <Text style={styles.label}>CVV</Text>;

  const renderCvvInput = () => (
    <TextInput
      style={styles.input}
      value={form.cvv}
      onChangeText={(text: string) => handleInputChange("cvv", text)}
      placeholder="123"
      keyboardType="numeric"
      maxLength={3}
      secureTextEntry
    />
  );

  const renderCvvGroup = () => (
    <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
      {renderCvvLabel()}
      {renderCvvInput()}
    </View>
  );

  const renderExpiryCvvRow = () => (
    <View style={styles.row}>
      {renderExpiryGroup()}
      {renderCvvGroup()}
    </View>
  );

  const renderCardholderLabel = () => (
    <Text style={styles.label}>Cardholder Name</Text>
  );

  const renderCardholderInput = () => (
    <TextInput
      style={styles.input}
      value={form.cardholderName}
      onChangeText={(text: string) => {
        // Only allow letters and spaces
        const filtered = text.replace(/[^a-zA-Z\s]/g, '');
        handleInputChange('cardholderName', filtered);
      }}
      placeholder="John Doe"
      autoCapitalize="words"
    />
  );

  const renderCardholderGroup = () => (
    <View style={styles.inputGroup}>
      {renderCardholderLabel()}
      {renderCardholderInput()}
    </View>
  );

  const renderFormContent = () => (
    <>
      {renderCardNumberGroup()}
      {renderExpiryCvvRow()}
      {renderCardholderGroup()}
    </>
  );

  const renderForm = () => (
    <>
      {renderSectionTitle()}
      {renderFormContent()}
    </>
  );

  const renderPayButtonText = () => (
    <Text style={styles.payButtonText}>Pay</Text>
  );

  const renderPayButtonContent = () => {
    if (isProcessing) {
      return <ActivityIndicator color="#fff" />;
    }
    return renderPayButtonText();
  };

  const renderPayButton = () => (
    <TouchableOpacity
      style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
      onPress={handlePayment}
      disabled={isProcessing}
    >
      {renderPayButtonContent()}
    </TouchableOpacity>
  );

  const renderCancelButton = () => (
    <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
  );

  const renderButtonGroup = () => (
    <View style={styles.buttonGroup}>
      {renderPayButton()}
      {renderCancelButton()}
    </View>
  );

  const renderScrollContent = () => (
    <>
      {renderTitle()}
      {renderSubtitle()}
      {renderPetSummary()}
      {renderForm()}
    </>
  );

  const renderScrollView = () => (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 24,
        paddingHorizontal: 16,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      {renderScrollContent()}
    </ScrollView>
  );

  const renderContent = () => (
    <View style={{ flexDirection: "column", width: "100%" }}>
      {renderScrollView()}
      {renderButtonGroup()}
    </View>
  );

  // ----------------------------------- END: UI RENDER METHODS -----------------------------------------------

  return (
    <BottomSheet visible={visible} onClose={handleClose}>
      {renderContent()}
    </BottomSheet>
  );
};

export { PaymentSheet };
