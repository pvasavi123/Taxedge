import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "../../../shared/theme";
import { ItrStepHeader } from "../components/incomeDetails/ItrStepHeader";
import { ItrProgressBar } from "../components/incomeDetails/ItrProgressBar";
import { PersonalInformationCard } from "../components/incomeDetails/PersonalInformationCard";
import { IncomeDetailsCard } from "../components/incomeDetails/IncomeDetailsCard";
import { RequiredDocumentsCard } from "../components/incomeDetails/RequiredDocumentsCard";
import { styles } from "./IncomeDetailsScreen.styles";
import {
  PersonalInformationData,
  IncomeDetailsFormErrors,
  RequiredDocumentItem,
} from "../types/incomeDetails.types";
import { getDocumentsForCategory } from "../mock/categoryDocuments";

interface IncomeDetailsScreenProps {
  onContinue?: (data: {
    personalInfo: PersonalInformationData;
    incomeAmount: string;
    documents: RequiredDocumentItem[];
  }) => void;
}

export const IncomeDetailsScreen: React.FC<IncomeDetailsScreenProps> = ({
  onContinue,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    professionId?: string;
    professionTitle?: string;
    formType?: string;
    serviceType?: string;
    serviceTitle?: string;
    assessmentYear?: string;
  }>();

  const professionId = params.professionId || "business-income";
  const professionTitle = params.professionTitle || "Business Income";
  const serviceTitle = params.serviceTitle || "ITR Filing";
  const assessmentYearParam = params.assessmentYear;

  // Form State
  const [personalInfo, setPersonalInfo] = useState<PersonalInformationData>({
    panNumber: "",
    aadhaarNumber: "",
    assessmentYear: assessmentYearParam || "2025-2026",
  });

  const [incomeAmount, setIncomeAmount] = useState<string>("");
  const [errors, setErrors] = useState<IncomeDetailsFormErrors>({});

  // Documents State
  const [documents, setDocuments] = useState<RequiredDocumentItem[]>(() =>
    getDocumentsForCategory(professionId)
  );

  const handlePersonalInfoChange = (
    updated: Partial<PersonalInformationData>
  ) => {
    setPersonalInfo((prev) => ({ ...prev, ...updated }));
    // Clear field-specific error when user edits
    if (updated.panNumber !== undefined) {
      setErrors((prev) => ({ ...prev, panNumber: undefined }));
    }
    if (updated.aadhaarNumber !== undefined) {
      setErrors((prev) => ({ ...prev, aadhaarNumber: undefined }));
    }
    if (updated.assessmentYear !== undefined) {
      setErrors((prev) => ({ ...prev, assessmentYear: undefined }));
    }
  };

  const handleIncomeAmountChange = (val: string) => {
    setIncomeAmount(val);
    if (errors.incomeAmount) {
      setErrors((prev) => ({ ...prev, incomeAmount: undefined }));
    }
  };

  const handleFilePicked = (
    id: string,
    fileInfo: { uri: string; name: string; size?: string }
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              fileUri: fileInfo.uri,
              fileName: fileInfo.name,
              fileSize: fileInfo.size,
            }
          : doc
      )
    );
  };

  const handleFileRemoved = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              fileUri: undefined,
              fileName: undefined,
              fileSize: undefined,
            }
          : doc
      )
    );
  };

  const validateForm = (): boolean => {
    const newErrors: IncomeDetailsFormErrors = {};

    // Validate PAN: 5 uppercase letters, 4 digits, 1 uppercase letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!personalInfo.panNumber || !panRegex.test(personalInfo.panNumber.trim())) {
      newErrors.panNumber = "Enter a valid PAN Number.";
    }

    // Validate Aadhaar: 12 digits
    const aadhaarRegex = /^\d{12}$/;
    if (
      !personalInfo.aadhaarNumber ||
      !aadhaarRegex.test(personalInfo.aadhaarNumber.trim())
    ) {
      newErrors.aadhaarNumber = "Enter a valid 12-digit Aadhaar Number.";
    }

    // Validate Assessment Year
    if (!personalInfo.assessmentYear) {
      newErrors.assessmentYear = "Select Assessment Year.";
    }

    // Validate Income Amount
    const numericIncome = Number(incomeAmount);
    if (!incomeAmount || isNaN(numericIncome) || numericIncome <= 0) {
      newErrors.incomeAmount = "Amount must be greater than zero.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    if (onContinue) {
      onContinue({
        personalInfo,
        incomeAmount,
        documents,
      });
    } else {
      // Navigate to Step 3 of the workflow (Deductions & Additional Information)
      router.push({
        pathname: "/service/itr-deductions" as any,
        params: {
          professionId,
          professionTitle,
          panNumber: personalInfo.panNumber,
          aadhaarNumber: personalInfo.aadhaarNumber,
          assessmentYear: personalInfo.assessmentYear,
          incomeAmount,
          serviceType: params.serviceType,
          serviceTitle: params.serviceTitle,
        },
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top App Header */}
      <ItrStepHeader
        title={serviceTitle}
        categoryName={
          assessmentYearParam
            ? `${professionTitle} • ${assessmentYearParam}`
            : professionTitle
        }
        onBack={() => router.back()}
      />

      {/* Step 2 of 5 Progress Bar */}
      <ItrProgressBar currentStep={2} totalSteps={5} />

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 88 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Page Title & Subtitle */}
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Income Details</Text>
          <Text style={styles.pageSubtitle}>
            Provide the required information to continue your ITR filing.
          </Text>
        </View>

        {/* Section 1 — Personal Information */}
        <PersonalInformationCard
          data={personalInfo}
          errors={errors}
          onChange={handlePersonalInfoChange}
        />

        {/* Section 2 — Business Income Details */}
        <IncomeDetailsCard
          categoryTitle={professionTitle}
          amount={incomeAmount}
          error={errors.incomeAmount}
          onChange={handleIncomeAmountChange}
        />

        {/* Section 3 — Required Documents */}
        <RequiredDocumentsCard
          categoryTitle={professionTitle}
          documents={documents}
          onFilePicked={handleFilePicked}
          onFileRemoved={handleFileRemoved}
        />
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, Spacing.md) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>
            Continue to Documents →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomeDetailsScreen;

