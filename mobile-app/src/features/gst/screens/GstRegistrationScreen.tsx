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
import { GstStepIndicator } from "../components/GstStepIndicator";
import { GstPersonalStep, GstPersonalFormData } from "../components/GstPersonalStep";
import { GstBusinessStep, GstBusinessFormData } from "../components/GstBusinessStep";
import { GstDocumentChecklistStep } from "../components/GstDocumentChecklistStep";
import { GstDocumentUploadStep } from "../components/GstDocumentUploadStep";
import { GstReviewStep } from "../components/GstReviewStep";
import { GstApplicationStatusStep } from "../components/GstApplicationStatusStep";
import { styles } from "./GstRegistrationScreen.styles";

const STEPS = ["Personal", "Business", "Documents", "Review", "Submit"];

export const GstRegistrationScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [screenIndex, setScreenIndex] = useState(0);
  const [declared, setDeclared] = useState(true);

  const [personalData, setPersonalData] = useState<GstPersonalFormData>({
    panNumber: "",
    aadhaarNumber: "",
    mobileNumber: "",
    emailAddress: "",
    businessName: "",
    businessType: "",
  });

  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});

  const [businessData, setBusinessData] = useState<GstBusinessFormData>({
    registeredBusinessName: "",
    natureOfBusiness: "",
    businessAddress: "",
    bankAccountNumber: "",
    ifscCode: "",
    addressProofType: "Rental Agreement",
  });

  const [businessErrors, setBusinessErrors] = useState<Record<string, string>>({});

  const getActiveStepForIndicator = () => {
    if (screenIndex === 0) return 0;
    if (screenIndex === 1) return 1;
    if (screenIndex === 2 || screenIndex === 3) return 2;
    if (screenIndex === 4) return 3;
    return 4;
  };

  const getScreenTitle = () => {
    switch (screenIndex) {
      case 0: return "GST Registration";
      case 1: return "Business Details";
      case 2: return "Document Checklist";
      case 3: return "Upload Documents";
      case 4: return "Review Application";
      default: return "Application Status";
    }
  };

  const getButtonText = () => {
    switch (screenIndex) {
      case 0: return "Continue to Business Details";
      case 1: return "Continue to Documents";
      case 2: return "Upload Documents";
      case 3: return "Continue to Review";
      case 4: return "Submit Application";
      default: return "";
    }
  };

  const validatePersonalDetails = (): boolean => {
    const errs: Record<string, string> = {};
    if (!GstValidators.isValidPan(personalData.panNumber)) {
      errs.panNumber = "Enter a valid 10-digit PAN (e.g. ABCDE1234F)";
    }
    if (!GstValidators.isValidAadhaar(personalData.aadhaarNumber)) {
      errs.aadhaarNumber = "Enter a valid 12-digit Aadhaar Number";
    }
    if (!GstValidators.isValidMobile(personalData.mobileNumber)) {
      errs.mobileNumber = "Enter a valid 10-digit mobile number";
    }
    if (!GstValidators.isValidEmail(personalData.emailAddress)) {
      errs.emailAddress = "Enter a valid email address (e.g. name@domain.com)";
    }
    if (!GstValidators.isNotEmpty(personalData.businessName, 2)) {
      errs.businessName = "Business / Trade name is required";
    }
    if (!GstValidators.isNotEmpty(personalData.businessType, 2)) {
      errs.businessType = "Please select a business type";
    }

    setPersonalErrors(errs);
    if (Object.keys(errs).length > 0) {
      Alert.alert("Incomplete Details", "Please fill all required personal fields correctly to continue.");
      return false;
    }
    return true;
  };

  const validateBusinessDetails = (): boolean => {
    const errs: Record<string, string> = {};
    if (!GstValidators.isNotEmpty(businessData.registeredBusinessName, 2)) {
      errs.registeredBusinessName = "Registered business name is required";
    }
    if (!GstValidators.isNotEmpty(businessData.natureOfBusiness, 2)) {
      errs.natureOfBusiness = "Please select nature of business";
    }
    if (!GstValidators.isNotEmpty(businessData.businessAddress, 5)) {
      errs.businessAddress = "Full business address with pincode is required";
    }
    if (!GstValidators.isValidBankAccount(businessData.bankAccountNumber)) {
      errs.bankAccountNumber = "Enter a valid bank account number (9 to 18 digits)";
    }
    if (!GstValidators.isValidIfsc(businessData.ifscCode)) {
      errs.ifscCode = "Enter a valid 11-digit IFSC code (e.g. HDFC0001234)";
    }

    setBusinessErrors(errs);
    if (Object.keys(errs).length > 0) {
      Alert.alert("Incomplete Details", "Please fill all required business and bank fields correctly to continue.");
      return false;
    }
    return true;
  };

  const handleBack = () => {
    if (screenIndex > 0 && screenIndex < 5) {
      setScreenIndex((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handleContinue = () => {
    if (screenIndex === 0) {
      if (!validatePersonalDetails()) return;
    } else if (screenIndex === 1) {
      if (!validateBusinessDetails()) return;
    } else if (screenIndex === 4 && !declared) {
      Alert.alert("Declaration Required", "Please accept the declaration to submit your application.");
      return;
    }

    if (screenIndex < 5) {
      setScreenIndex((prev) => prev + 1);
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

      {/* 5-Step Indicator */}
      {screenIndex < 5 && (
        <GstStepIndicator
          steps={STEPS}
          currentStep={getActiveStepForIndicator()}
        />
      )}

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          screenIndex === 5 && { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
        nestedScrollEnabled={true}
      >
        {screenIndex === 0 && (
          <GstPersonalStep
            data={personalData}
            errors={personalErrors}
            onChange={(fields) => {
              setPersonalData((prev) => ({ ...prev, ...fields }));
              setPersonalErrors((prev) => {
                const next = { ...prev };
                Object.keys(fields).forEach((k) => delete next[k]);
                return next;
              });
            }}
          />
        )}

        {screenIndex === 1 && (
          <GstBusinessStep
            data={businessData}
            errors={businessErrors}
            onChange={(fields) => {
              setBusinessData((prev) => ({ ...prev, ...fields }));
              setBusinessErrors((prev) => {
                const next = { ...prev };
                Object.keys(fields).forEach((k) => delete next[k]);
                return next;
              });
            }}
          />
        )}

        {screenIndex === 2 && <GstDocumentChecklistStep />}

        {screenIndex === 3 && <GstDocumentUploadStep />}

        {screenIndex === 4 && (
          <GstReviewStep
            personalData={personalData}
            businessData={businessData}
            onEditStep={(stepIdx) => {
              if (stepIdx === 0) setScreenIndex(0);
              if (stepIdx === 1) setScreenIndex(1);
              if (stepIdx === 2) setScreenIndex(2);
            }}
            declared={declared}
            onToggleDeclaration={() => setDeclared((prev) => !prev)}
          />
        )}

        {screenIndex === 5 && <GstApplicationStatusStep />}

        {/* Action Button - In scroll view so it stays at the bottom and never floats over inputs */}
        {screenIndex < 5 && (
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

export default GstRegistrationScreen;
