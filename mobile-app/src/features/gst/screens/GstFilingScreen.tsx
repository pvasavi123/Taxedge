import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { GstValidators } from "../utils/gstValidators";
import {
  GstFilingPeriodStep,
  GstFilingPeriodData,
} from "../components/filing/GstFilingPeriodStep";
import { GstFilingDocumentsStep } from "../components/filing/GstFilingDocumentsStep";
import { GstFilingReviewStep } from "../components/filing/GstFilingReviewStep";
import { GstPaymentMethodStep } from "../components/payment/GstPaymentMethodStep";
import { GstPaymentSuccessStep } from "../components/payment/GstPaymentSuccessStep";
import { GstPaymentReceiptStep } from "../components/payment/GstPaymentReceiptStep";
import { styles } from "./GstFilingScreen.styles";
import { GstApplicationStatusStep } from "../components/GstApplicationStatusStep";

export const GstFilingScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);

  const [periodData, setPeriodData] = useState<GstFilingPeriodData>({
    periodType: "Monthly",
    filingMonth: "July 2026",
    gstin: "29PAVAN1234K1Z5",
    filingType: "GSTR-3B (Monthly Summary Return)",
  });
  const [periodErrors, setPeriodErrors] = useState<Record<string, string>>({});

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [upiId, setUpiId] = useState("pavan@ybl");
  const [upiError, setUpiError] = useState("");

  const getScreenTitle = () => {
    switch (currentStep) {
      case 0: return "GST Filing";
      case 1: return "Filing Documents";
      case 2: return "Filing Review";
      case 3: return "Complete Payment";
      case 4: return "Payment Successful";
      case 5: return "Payment Receipt";
      default: return "Application Status";
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0: return "Continue to Documents";
      case 1: return "Continue to Review";
      case 2: return "Approve & Proceed to Payment";
      case 3: return "Pay Securely ₹2,344";
      default: return "";
    }
  };

  const validatePeriodStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (!GstValidators.isValidGstin(periodData.gstin)) {
      errs.gstin = "Enter a valid 15-character GSTIN (e.g. 29PAVAN1234K1Z5)";
    }
    if (!GstValidators.isNotEmpty(periodData.filingMonth)) {
      errs.filingMonth = "Please select a filing month";
    }
    if (!GstValidators.isNotEmpty(periodData.filingType)) {
      errs.filingType = "Please select a filing type";
    }

    setPeriodErrors(errs);
    if (Object.keys(errs).length > 0) {
      Alert.alert("Invalid Input", "Please fill in all required fields with valid details.");
      return false;
    }
    return true;
  };

  const validatePaymentStep = (): boolean => {
    if (selectedMethod === "upi") {
      if (!GstValidators.isValidUpi(upiId)) {
        setUpiError("Enter a valid UPI ID (e.g. yourname@bank / pavan@ybl)");
        Alert.alert("Invalid UPI ID", "Please enter a valid UPI ID to proceed with payment.");
        return false;
      }
    }
    setUpiError("");
    return true;
  };

  const handleBack = () => {
    if (currentStep === 5 || currentStep === 6) {
      setCurrentStep(4);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleContinue = () => {
    if (currentStep === 0) {
      if (!validatePeriodStep()) return;
    } else if (currentStep === 3) {
      if (!validatePaymentStep()) return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.root}>
      {/* Top Header Bar */}
      <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={BrandColors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getScreenTitle()}</Text>
        <View style={styles.placeholderBox} />
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          currentStep >= 4 && { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
        nestedScrollEnabled={true}
      >
        {currentStep === 0 && (
          <GstFilingPeriodStep
            data={periodData}
            errors={periodErrors}
            onChange={(fields) => {
              setPeriodData((prev) => ({ ...prev, ...fields }));
              setPeriodErrors((prev) => {
                const next = { ...prev };
                Object.keys(fields).forEach((k) => delete next[k]);
                return next;
              });
            }}
          />
        )}

        {currentStep === 1 && <GstFilingDocumentsStep />}

        {currentStep === 2 && (
          <GstFilingReviewStep
            onApprove={handleContinue}
            onRequestChanges={() =>
              Alert.alert(
                "Request Changes",
                "Your request has been sent to our CA. You will receive an updated return summary shortly."
              )
            }
          />
        )}

        {currentStep === 3 && (
          <GstPaymentMethodStep
            amount="₹2,344"
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
            upiId={upiId}
            onChangeUpiId={(id) => {
              setUpiId(id);
              setUpiError("");
            }}
            upiError={upiError}
          />
        )}

        {currentStep === 4 && (
          <GstPaymentSuccessStep
            amount="₹2,344"
            serviceName="GST Filing"
            onViewReceipt={() => setCurrentStep(5)}
            onViewApplication={() => setCurrentStep(6)}
          />
        )}

        {currentStep === 5 && (
          <GstPaymentReceiptStep
            amount="₹2,344"
            serviceName="GST Filing Service"
            invoiceNo="INV-2026-00001"
          />
        )}

        {currentStep === 6 && <GstApplicationStatusStep />}

        {/* Action Button - In scroll view so it stays at the bottom and never floats over inputs */}
        {currentStep <= 3 && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleContinue}
              style={styles.submitBtn}
            >
              <Text style={styles.submitBtnText}>{getButtonText()}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default GstFilingScreen;
