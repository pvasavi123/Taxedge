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
import { PreviousYearSuccessCard } from "../components/submission/PreviousYearSuccessCard";
import { PreviousYearStepperTimeline } from "../components/submission/PreviousYearStepperTimeline";
import { PreviousYearStatusInfoCard } from "../components/submission/PreviousYearStatusInfoCard";
import { WhatHappensNextInfoCard } from "../components/submission/WhatHappensNextInfoCard";
import { PreviousYearSubmissionDetails } from "../types/submission.types";
import { styles } from "./PreviousYearSubmittedScreen.styles";

export const PreviousYearSubmittedScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
    assessmentYear?: string;
  }>();

  const applicationId = params.applicationId || "ITR-2026-00046";
  const assessmentYear = params.assessmentYear || "AY 2023–24";

  const details: PreviousYearSubmissionDetails = {
    applicationId,
    applicationStatus: "Under Verification",
    assessmentYear,
    assignedTo: "Tax Executive",
    estimatedProcessingTime: "3–5 Working Days",
    notificationMethod: "SMS & Email",
  };

  const handleBack = () => {
    router.replace("/service/itr" as any);
  };

  const handleTrackStatus = () => {
    router.replace("/(main)/home" as any);
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
          <Text style={styles.headerSubtitle}>Application Submitted</Text>
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
        {/* Success Card with Green Checkmark & Application ID */}
        <PreviousYearSuccessCard applicationId={applicationId} />

        {/* 5-Stage Stepper Timeline */}
        <PreviousYearStepperTimeline />

        {/* Status Information Card */}
        <PreviousYearStatusInfoCard details={details} />

        {/* What Happens Next Information Card */}
        <WhatHappensNextInfoCard />
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTrackStatus}
          style={styles.trackButton}
        >
          <Text style={styles.trackButtonText}>Track Application Status</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviousYearSubmittedScreen;
