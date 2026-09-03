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
import { RefundProgressTracker } from "../components/status/RefundProgressTracker";
import { RefundDetailsCard } from "../components/status/RefundDetailsCard";
import { VerificationStatusCard } from "../components/status/VerificationStatusCard";
import { NextStepsTimeline } from "../components/status/NextStepsTimeline";
import { StatusNotificationCard } from "../components/status/StatusNotificationCard";
import { SupportCard } from "../components/status/SupportCard";
import { DEFAULT_TDS_STATUS_DETAILS } from "../mock/statusData";
import { TdsRefundStatusDetails } from "../types/status.types";
import { styles } from "./TdsRefundStatusScreen.styles";

export const TdsRefundStatusScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
    refundAmount?: string;
  }>();

  const details: TdsRefundStatusDetails = {
    applicationId: params.applicationId || DEFAULT_TDS_STATUS_DETAILS.applicationId,
    filedOn: DEFAULT_TDS_STATUS_DETAILS.filedOn,
    estimatedRefund: params.refundAmount || DEFAULT_TDS_STATUS_DETAILS.estimatedRefund,
    refundToBank: DEFAULT_TDS_STATUS_DETAILS.refundToBank,
    expectedProcessingTime: DEFAULT_TDS_STATUS_DETAILS.expectedProcessingTime,
  };

  const handleBack = () => {
    router.replace("/service/itr" as any);
  };

  const handleTaxServices = () => {
    router.replace("/service/itr" as any);
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
          <Text style={styles.headerSubtitle}>Refund Status</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Your Refund Status</Text>
          <Text style={styles.pageSubtitle}>
            Track your refund request in real time. We’ll notify you
            automatically whenever your application moves to the next stage.
          </Text>
        </View>

        {/* 6-Stage Horizontal Progress Tracker */}
        <RefundProgressTracker />

        {/* 5-Row Refund Details Card */}
        <RefundDetailsCard details={details} />

        {/* Current Status Card: Under Verification */}
        <VerificationStatusCard />

        {/* Vertical Next Steps Timeline */}
        <NextStepsTimeline />

        {/* Automated Notification Notice */}
        <StatusNotificationCard />

        {/* Need Help Support Card */}
        <SupportCard />
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
          onPress={handleTaxServices}
          style={styles.ctaButton}
        >
          <Ionicons name="business-outline" size={18} color="#FFFFFF" />
          <Text style={styles.ctaButtonText}>Back to Tax Services</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TdsRefundStatusScreen;
