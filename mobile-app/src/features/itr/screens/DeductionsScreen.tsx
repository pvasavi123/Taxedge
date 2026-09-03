import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Spacing } from "../../../shared/theme";
import { TaxDeductionsCard } from "../components/deductions/TaxDeductionsCard";
import { AdditionalInformationCard } from "../components/deductions/AdditionalInformationCard";
import { styles } from "./DeductionsScreen.styles";
import {
  DeductionsFormData,
  DeductionsFormErrors,
  PreviousFilingOption,
} from "../types/deductions.types";

interface DeductionsScreenProps {
  onContinue?: (data: DeductionsFormData) => void;
}

export const DeductionsScreen: React.FC<DeductionsScreenProps> = ({
  onContinue,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    professionId?: string;
    professionTitle?: string;
    panNumber?: string;
    aadhaarNumber?: string;
    assessmentYear?: string;
    incomeAmount?: string;
    serviceType?: string;
    serviceTitle?: string;
  }>();

  const serviceTitle = params.serviceTitle || "ITR Filing";
  const assessmentYearParam = params.assessmentYear;

  const [formData, setFormData] = useState<DeductionsFormData>({
    sec80c: "",
    sec80d: "",
    homeLoan24b: "",
    educationLoan80e: "",
    otherDeductions: "",
    previousFilingOption: "previous_itr",
  });

  const [errors, setErrors] = useState<DeductionsFormErrors>({});

  const handleFormChange = (updated: Partial<DeductionsFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
    // Clear error for field
    if (updated.sec80c !== undefined) {
      setErrors((prev) => ({ ...prev, sec80c: undefined }));
    }
    if (updated.sec80d !== undefined) {
      setErrors((prev) => ({ ...prev, sec80d: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: DeductionsFormErrors = {};

    // Validate 80C: Mandatory, max 150000
    if (!formData.sec80c.trim()) {
      newErrors.sec80c = "This field is required.";
    } else {
      const val80c = Number(formData.sec80c);
      if (isNaN(val80c) || val80c < 0) {
        newErrors.sec80c = "Enter a valid amount.";
      } else if (val80c > 150000) {
        newErrors.sec80c = "80C deduction cannot exceed ₹1,50,000.";
      }
    }

    // Validate 80D: Mandatory
    if (!formData.sec80d.trim()) {
      newErrors.sec80d = "This field is required.";
    } else {
      const val80d = Number(formData.sec80d);
      if (isNaN(val80d) || val80d < 0) {
        newErrors.sec80d = "Enter a valid amount.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    const isValid = validateForm();
    if (!isValid) return;

    if (onContinue) {
      onContinue(formData);
    } else {
      // Continue to Step 4 of the workflow
      router.push({
        pathname: "/service/itr-documents" as any,
        params: {
          ...params,
          sec80c: formData.sec80c,
          sec80d: formData.sec80d,
          homeLoan24b: formData.homeLoan24b,
          educationLoan80e: formData.educationLoan80e,
          otherDeductions: formData.otherDeductions,
          previousFilingOption: formData.previousFilingOption,
        },
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>{serviceTitle}</Text>
          <Text style={styles.headerSubtitle}>
            {assessmentYearParam ? `Deductions • ${assessmentYearParam}` : "Step 3 of 5"}
          </Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Progress Bar (60%) */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
      </View>

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
          <Text style={styles.pageTitle}>
            Deductions & Additional Information
          </Text>
          <Text style={styles.pageSubtitle}>
            Enter your eligible deductions to calculate your taxable income accurately.
          </Text>
        </View>

        {/* Section 1: Tax Deductions */}
        <TaxDeductionsCard
          formData={formData}
          errors={errors}
          onChange={handleFormChange}
        />

        {/* Section 2: Additional Information */}
        <AdditionalInformationCard
          selectedOption={formData.previousFilingOption}
          onSelect={(opt) => handleFormChange({ previousFilingOption: opt })}
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
            Continue to Documents
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeductionsScreen;

