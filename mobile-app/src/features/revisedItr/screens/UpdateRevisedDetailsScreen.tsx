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
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { RevisedFormField } from "../components/update/RevisedFormField";
import { DEFAULT_REVISED_FORM_FIELDS } from "../mock/revisedItrData";
import { RevisedFormFields } from "../types/revisedItr.types";
import { styles } from "./UpdateRevisedDetailsScreen.styles";

export const UpdateRevisedDetailsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
    revisionReason?: string;
  }>();

  const [form, setForm] = useState<RevisedFormFields>(DEFAULT_REVISED_FORM_FIELDS);
  const [errors, setErrors] = useState<Partial<Record<keyof RevisedFormFields, string>>>({});

  const handleChange = (field: keyof RevisedFormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RevisedFormFields, string>> = {};

    // Salary / Business Income
    if (!form.salaryBusinessIncome.trim()) {
      newErrors.salaryBusinessIncome = "Salary / Business income is required.";
    }

    // Bank Account Number (8-18 alphanumeric / digits)
    const cleanBank = form.bankAccount.replace(/[^\w]/g, "");
    if (!cleanBank || cleanBank.length < 4) {
      newErrors.bankAccount = "Enter a valid bank account number.";
    }

    // IFSC Validation (11 characters)
    const cleanIfsc = form.ifsc.trim().toUpperCase();
    if (!cleanIfsc) {
      newErrors.ifsc = "IFSC code is required.";
    } else if (cleanIfsc.length !== 11) {
      newErrors.ifsc = "IFSC must be 11 characters.";
    }

    // Taxable Income
    if (!form.taxableIncome.trim()) {
      newErrors.taxableIncome = "Taxable income is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    // Navigate to Screen 4: Upload Supporting Documents
    router.push({
      pathname: "/service/revised-itr-documents" as any,
      params: {
        acknowledgementNumber: params.acknowledgementNumber,
        assessmentYear: params.assessmentYear || "AY 2025–26",
        revisionReason: params.revisionReason,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Update Details" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Update only what changed</Text>
          <Text style={styles.pageSubtitle}>
            Your original figures are pre-filled — edit the ones that need
            correcting.
          </Text>
        </View>

        {/* 1. Salary / Business Income */}
        <RevisedFormField
          label="Salary / Business income"
          value={form.salaryBusinessIncome}
          onChangeText={(val) => handleChange("salaryBusinessIncome", val)}
          isMandatory
          isLikelyChange
          keyboardType="numeric"
          error={errors.salaryBusinessIncome}
        />

        {/* 2. Other Income */}
        <RevisedFormField
          label="Other income"
          value={form.otherIncome}
          onChangeText={(val) => handleChange("otherIncome", val)}
          isLikelyChange
          keyboardType="numeric"
          error={errors.otherIncome}
        />

        {/* 3. 80C Deduction */}
        <RevisedFormField
          label="80C deduction"
          value={form.sec80c}
          onChangeText={(val) => handleChange("sec80c", val)}
          keyboardType="numeric"
        />

        {/* 4. 80D Deduction */}
        <RevisedFormField
          label="80D deduction"
          value={form.sec80d}
          onChangeText={(val) => handleChange("sec80d", val)}
          keyboardType="numeric"
        />

        {/* 5. Home Loan Interest */}
        <RevisedFormField
          label="Home loan interest"
          value={form.homeLoanInterest}
          onChangeText={(val) => handleChange("homeLoanInterest", val)}
          keyboardType="numeric"
        />

        {/* 6. Bank Account for Refund */}
        <RevisedFormField
          label="Bank account for refund"
          value={form.bankAccount}
          onChangeText={(val) => handleChange("bankAccount", val)}
          isMandatory
          placeholder="e.g. HDFC ••••1826"
          error={errors.bankAccount}
        />

        {/* 7. IFSC Code */}
        <RevisedFormField
          label="IFSC"
          value={form.ifsc}
          onChangeText={(val) => handleChange("ifsc", val.toUpperCase())}
          isMandatory
          maxLength={11}
          autoCapitalize="characters"
          placeholder="e.g. HDFC0000412"
          error={errors.ifsc}
        />

        {/* 8. Taxable Income */}
        <RevisedFormField
          label="Taxable income"
          value={form.taxableIncome}
          onChangeText={(val) => handleChange("taxableIncome", val)}
          isMandatory
          keyboardType="numeric"
          error={errors.taxableIncome}
        />
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateRevisedDetailsScreen;
