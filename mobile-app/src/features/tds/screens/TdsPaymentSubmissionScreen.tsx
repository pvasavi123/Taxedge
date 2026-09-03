import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PaymentMethodCard } from "../components/payment/PaymentMethodCard";
import { FeeSummaryCard } from "../components/payment/FeeSummaryCard";
import { ApplicationSuccessCard } from "../components/payment/ApplicationSuccessCard";
import { RefundProgressTimeline } from "../components/payment/RefundProgressTimeline";
import {
  NotificationCard,
  BankGradeSecurityBanner,
} from "../components/payment/NotificationCard";
import {
  PaymentMethodType,
  PaymentOptionItem,
  TdsFeeBreakdown,
} from "../types/payment.types";
import { styles } from "./TdsPaymentSubmissionScreen.styles";

const PAYMENT_METHODS: PaymentOptionItem[] = [
  {
    id: "upi",
    title: "UPI",
    subtitle: "Google Pay, PhonePe, Paytm or any UPI app",
    iconName: "qr-code-outline",
  },
  {
    id: "debit",
    title: "Debit Card",
    subtitle: "Visa, Mastercard, RuPay",
    iconName: "card-outline",
  },
  {
    id: "credit",
    title: "Credit Card",
    subtitle: "Visa, Mastercard, AMEX",
    iconName: "card",
  },
  {
    id: "netbanking",
    title: "Net Banking",
    subtitle: "All major Indian banks",
    iconName: "business-outline",
  },
];

const FEE_DATA: TdsFeeBreakdown = {
  refundEstimate: 23400,
  serviceFeePercent: 15,
  serviceFeeAmount: 3510,
  gstPercent: 18,
  gstAmount: 632,
  totalPayable: 4142,
};

export const TdsPaymentSubmissionScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
  }>();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const applicationId = params.applicationId || "ITR-2026-00043";

  const handlePayPress = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1200);
  };

  const handleTrackStatus = () => {
    router.push({
      pathname: "/service/tds-status" as any,
      params: {
        applicationId,
        refundAmount: "₹23,400",
      },
    });
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
          <Text style={styles.headerTitle}>TDS Refund</Text>
          <Text style={styles.headerSubtitle}>Pay Fee & Submit</Text>
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
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Pay the 15% service fee</Text>
          <Text style={styles.pageSubtitle}>
            Once paid, your refund claim enters the TDS queue.
          </Text>
        </View>

        {/* 2-Column Split: Payment Methods on Left, Fee Summary on Right */}
        <View style={styles.splitSection}>
          {/* Left: Payment Method Cards */}
          <View style={styles.methodsColumn}>
            {PAYMENT_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.id}
                item={method}
                isSelected={selectedMethod === method.id}
                onSelect={setSelectedMethod}
                disabled={isPaid || isProcessing}
              />
            ))}
          </View>

          {/* Right: Fee Summary Card */}
          <View style={styles.summaryColumn}>
            <FeeSummaryCard feeData={FEE_DATA} />
          </View>
        </View>

        {/* Pay Button (Visible before payment) */}
        {!isPaid && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePayPress}
            disabled={isProcessing}
            style={[
              styles.payButton,
              isProcessing && styles.payButtonDisabled,
            ]}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
                <Text style={styles.payButtonText}>Pay ₹4,142 Securely</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Success Section (Appears after clicking pay) */}
        {isPaid && (
          <View style={styles.successSection}>
            {/* Application Received Card */}
            <ApplicationSuccessCard applicationId={applicationId} />

            {/* 5-Stage Refund Timeline */}
            <RefundProgressTimeline />

            {/* Notification Notice Card */}
            <NotificationCard />

            {/* Bank Grade Security Banner */}
            <BankGradeSecurityBanner />
          </View>
        )}
      </ScrollView>

      {/* Bottom Sticky Action: Track Refund Status (Enabled after payment) */}
      {isPaid && (
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
            <Text style={styles.trackButtonText}>Track Refund Status</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TdsPaymentSubmissionScreen;
