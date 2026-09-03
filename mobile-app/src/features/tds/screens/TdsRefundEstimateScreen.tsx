import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { EstimatedRefundHeroCard } from "../components/estimate/EstimatedRefundHeroCard";
import { RefundBreakdownCard } from "../components/estimate/RefundBreakdownCard";
import { EstimatedCalculationBanner } from "../components/estimate/EstimatedCalculationBanner";
import { DEFAULT_TDS_ESTIMATE } from "../mock/estimateData";
import { styles } from "./TdsRefundEstimateScreen.styles";

export const TdsRefundEstimateScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    router.back();
  };

  const handleConfirmAndContinue = () => {
    // Navigate to next screen: Payment & Application Submission
    router.push({
      pathname: "/service/tds-payment" as any,
      params: {
        refundAmount: "₹23,400",
        applicationId: "ITR-2026-00043",
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
          <Text style={styles.headerTitle}>TDS Refund</Text>
          <Text style={styles.headerSubtitle}>Estimated Refund</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 140 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Your Refund Estimate</Text>
          <Text style={styles.pageSubtitle}>
            Review the estimated refund calculated from your uploaded documents
            before proceeding.
          </Text>
        </View>

        {/* Estimated Refund Hero Card */}
        <EstimatedRefundHeroCard amount={DEFAULT_TDS_ESTIMATE.estimatedRefund} />

        {/* Refund Breakdown Card */}
        <RefundBreakdownCard data={DEFAULT_TDS_ESTIMATE} />

        {/* Estimated Calculation Banner */}
        <EstimatedCalculationBanner />
      </ScrollView>

      {/* Bottom Sticky Actions */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
          style={styles.backActionButton}
        >
          <Text style={styles.backActionText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleConfirmAndContinue}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmButtonText}>Confirm & Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Bank-Grade Encryption Notice */}
        <View style={styles.securityRow}>
          <Ionicons name="shield-checkmark" size={15} color="#0B1F3A" />
          <Text style={styles.securityText}>
            Your data is secure with bank-grade encryption.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TdsRefundEstimateScreen;
