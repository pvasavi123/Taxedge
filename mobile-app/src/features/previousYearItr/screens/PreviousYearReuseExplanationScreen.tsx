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
import { StatusBadge } from "../components/StatusBadge";
import { ReusableStepCard } from "../components/ReusableStepCard";
import { WorkflowInfoCard } from "../components/WorkflowInfoCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { styles } from "./PreviousYearReuseExplanationScreen.styles";

export const PreviousYearReuseExplanationScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    assessmentYear?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2023–24";

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Navigate directly to the existing reusable Profession / Income Type Selection screen
    // passing the assessmentYear and serviceType so the workflow dynamically reflects Previous Year ITR!
    router.push({
      pathname: "/service/itr-filing" as any,
      params: {
        serviceType: "previous-year",
        serviceTitle: "Previous Year ITR",
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
          <Text style={styles.headerSubtitle}>{assessmentYear} Filing</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Badge */}
        <StatusBadge label={`• Belated Return • ${assessmentYear}`} />

        {/* Heading Section */}
        <View style={styles.headingSection}>
          <Text style={styles.mainHeading}>
            Same Questions, Different Assessment Year
          </Text>
          <Text style={styles.supportingText}>
            Your personal details, income information, and deductions are
            collected exactly like the regular ITR Filing process. Only the
            assessment year changes.
          </Text>
        </View>

        {/* 3 Reusable Step Cards */}
        <ReusableStepCard
          stepNumber={1}
          iconName="briefcase-outline"
          title="Step 1 – Income Type"
          description="Choose your income category such as Salaried, Business, Professional, Freelancer, Capital Gains, Rental Income, or Multiple Sources."
          trailingLabel="Same as ITR Filing"
        />

        <ReusableStepCard
          stepNumber={2}
          iconName="document-text-outline"
          title="Step 2 – Income Details"
          description="Enter PAN, Aadhaar, assessment year, and all relevant income information based on your selected category."
          trailingLabel="Same as ITR Filing"
        />

        <ReusableStepCard
          stepNumber={3}
          iconName="calculator-outline"
          title="Step 3 – Deductions"
          description="Provide investment details, insurance, home loan interest, education loan interest, and any additional deductions."
          trailingLabel="Same as ITR Filing"
        />

        {/* Info Notice Card */}
        <WorkflowInfoCard
          title="No Need to Rebuild"
          description="The Previous Year ITR workflow reuses the same forms as the regular ITR Filing process. Only the filing year and return type are different."
        />
      </ScrollView>

      {/* Sticky Bottom Continue Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <PrimaryButton label="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default PreviousYearReuseExplanationScreen;
