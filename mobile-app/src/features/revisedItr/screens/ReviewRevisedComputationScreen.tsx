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
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { ComputationComparisonTable } from "../components/review/ComputationComparisonTable";
import { RevisedRefundHeroCard } from "../components/review/RevisedRefundHeroCard";
import { styles } from "./ReviewRevisedComputationScreen.styles";

export const ReviewRevisedComputationScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
    revisionReason?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2025–26";

  const handleProceedPayment = () => {
    // Navigate to Application Received / Success screen with Revised ITR details
    router.push({
      pathname: "/service/itr-success" as any,
      params: {
        serviceType: "revised",
        serviceTitle: "Revised ITR",
        assessmentYear,
        applicationId: "REV-2026-00052",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Review & Submit" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Pill Badge */}
        <View style={styles.badgeWrapper}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              • Revised Return • {assessmentYear}
            </Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>
            Please review your revised computation
          </Text>
          <Text style={styles.pageSubtitle}>
            Same review, approval, filing and e-verification as regular ITR
            Filing — labelled as a revision.
          </Text>
        </View>

        {/* 5-Row Comparison Table */}
        <ComputationComparisonTable />

        {/* Revised Refund Summary Card */}
        <RevisedRefundHeroCard />

        {/* Confirmation Note Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            By submitting, you confirm that the above details are correct and you
            want to file a revised return for {assessmentYear}.
          </Text>
        </View>
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
          onPress={handleProceedPayment}
          style={styles.proceedButton}
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewRevisedComputationScreen;
