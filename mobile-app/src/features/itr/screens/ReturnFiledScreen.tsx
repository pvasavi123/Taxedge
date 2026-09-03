import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReturnFiledHeader } from "../components/verification/ReturnFiledHeader";
import { FilingDetailsCard } from "../components/verification/FilingDetailsCard";
import { AadhaarOtpModal } from "../components/verification/AadhaarOtpModal";
import { VerifiedSplashScreen } from "../components/verification/VerifiedSplashScreen";
import { DEFAULT_FILING_DATA } from "../mock/verificationData";
import { FilingVerificationData } from "../types/verification.types";
import { styles } from "./ReturnFiledScreen.styles";

export const ReturnFiledScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
    formType?: string;
    refundAmount?: string;
  }>();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const filingData: FilingVerificationData = {
    acknowledgementNumber:
      params.acknowledgementNumber || DEFAULT_FILING_DATA.acknowledgementNumber,
    filedDate: DEFAULT_FILING_DATA.filedDate,
    itrForm: params.formType || DEFAULT_FILING_DATA.itrForm,
    assessmentYear: params.assessmentYear || DEFAULT_FILING_DATA.assessmentYear,
    refundClaimed: params.refundAmount || DEFAULT_FILING_DATA.refundClaimed,
    isRefund: true,
  };

  const handleBack = () => {
    Alert.alert(
      "E-Verification Pending",
      "You have 30 days to complete e-verification from the ITR Status page. Do you want to exit?",
      [
        { text: "Continue E-Verify", style: "cancel" },
        {
          text: "Exit",
          style: "destructive",
          onPress: () => router.replace("/(main)/home" as any),
        },
      ]
    );
  };

  const handleNetBankingVerify = () => {
    Alert.alert(
      "Net Banking Verification",
      "Redirecting to ITD Net Banking portal gateway for authentication...",
      [
        {
          text: "Simulate Verification",
          onPress: () => setIsVerified(true),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  if (isVerified) {
    return (
      <VerifiedSplashScreen
        acknowledgementNumber={filingData.acknowledgementNumber}
        onDone={() => router.replace("/(main)/home" as any)}
      />
    );
  }

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
          <Text style={styles.headerTitle}>ITR Filing</Text>
          <Text style={styles.headerSubtitle}>Return Filed</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header */}
        <ReturnFiledHeader />

        {/* 4-Row Filing Details Card */}
        <FilingDetailsCard data={filingData} />

        {/* Action 1: E-verify with Aadhaar OTP */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowOtpModal(true)}
          style={styles.aadhaarOtpButton}
        >
          <Ionicons name="lock-closed-outline" size={18} color="#FFFFFF" />
          <Text style={styles.aadhaarOtpText}>E-verify with Aadhaar OTP</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Action 2: E-verify with Net Banking */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNetBankingVerify}
          style={styles.netBankingButton}
        >
          <Ionicons name="business-outline" size={18} color="#0B1F3A" />
          <Text style={styles.netBankingText}>E-verify with net banking</Text>
          <Ionicons name="arrow-forward" size={18} color="#0B1F3A" />
        </TouchableOpacity>

        {/* 30 Days Reminder Banner */}
        <View style={styles.reminderBanner}>
          <View style={styles.reminderHeader}>
            <Ionicons name="warning-outline" size={18} color="#EA580C" />
            <Text style={styles.reminderTitle}>30 days to e-verify</Text>
          </View>
          <Text style={styles.reminderDescription}>
            If it is not e-verified within 30 days of filing, the department treats the return as never filed.
          </Text>
        </View>

        {/* Security & Bank-Grade Trust Banner */}
        <View style={styles.securityBanner}>
          <Ionicons name="shield-checkmark" size={16} color="#2563EB" />
          <Text style={styles.securityText}>
            Your data is encrypted and secured with bank-grade security.
          </Text>
        </View>
      </ScrollView>

      {/* Aadhaar OTP Input Modal */}
      <AadhaarOtpModal
        visible={showOtpModal}
        onVerifySuccess={() => setIsVerified(true)}
        onClose={() => setShowOtpModal(false)}
      />
    </View>
  );
};

export default ReturnFiledScreen;
