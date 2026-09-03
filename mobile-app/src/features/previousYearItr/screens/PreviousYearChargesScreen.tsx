import React from "react";
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
import { LateFilingHeaderBanner } from "../components/charges/LateFilingHeaderBanner";
import { GovernmentChargesCard } from "../components/charges/GovernmentChargesCard";
import { ServiceFeeCard } from "../components/charges/ServiceFeeCard";
import { ChargesEstimateWarningBanner } from "../components/charges/ChargesEstimateWarningBanner";
import { DEFAULT_PREVIOUS_YEAR_CHARGES } from "../mock/chargesData";
import { styles } from "./PreviousYearChargesScreen.styles";

export const PreviousYearChargesScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    assessmentYear?: string;
  }>();

  const assessmentYear =
    params.assessmentYear || DEFAULT_PREVIOUS_YEAR_CHARGES.assessmentYear;

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Navigate to Application Received / Success for Previous Year ITR
    router.push({
      pathname: "/service/previous-year-success" as any,
      params: {
        applicationId: "ITR-2026-00046",
        assessmentYear: assessmentYear,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Previous Year ITR</Text>
          <Text style={styles.headerSubtitle}>Fees & Charges</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Notice Banner */}
        <LateFilingHeaderBanner />

        {/* 2 Side-by-Side Summary Cards */}
        <View style={styles.cardsRow}>
          <GovernmentChargesCard
            charges={DEFAULT_PREVIOUS_YEAR_CHARGES.governmentCharges}
          />
          <ServiceFeeCard
            serviceFee={DEFAULT_PREVIOUS_YEAR_CHARGES.serviceFee}
          />
        </View>

        {/* Warning Notice Card */}
        <ChargesEstimateWarningBanner assessmentYear={assessmentYear} />
      </ScrollView>

      {/* Sticky Bottom Action */}
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

export default PreviousYearChargesScreen;
