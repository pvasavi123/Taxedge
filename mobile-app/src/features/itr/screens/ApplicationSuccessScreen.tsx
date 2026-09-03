import React from "react";
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
import { SuccessCelebrationHeader } from "../components/success/SuccessCelebrationHeader";
import { FilingProgressTracker } from "../components/success/FilingProgressTracker";
import { ApplicationSummaryCard } from "../components/success/ApplicationSummaryCard";
import { WhatHappensNextCard } from "../components/success/WhatHappensNextCard";
import { ApplicationSummaryData } from "../types/success.types";
import { styles } from "./ApplicationSuccessScreen.styles";

interface ApplicationSuccessScreenProps {
  onTrackStatus?: () => void;
  onDownloadAcknowledgement?: () => void;
}

export const ApplicationSuccessScreen: React.FC<ApplicationSuccessScreenProps> = ({
  onTrackStatus,
  onDownloadAcknowledgement,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
    professionTitle?: string;
    formType?: string;
    assessmentYear?: string;
    uploadedDocsCount?: string;
  }>();

  const appId = params.applicationId || "ITR-2026-00042";
  const incomeType = params.professionTitle || "Business";
  const formType = params.formType || "ITR-3";
  const assessmentYear = params.assessmentYear || "AY 2026-27";
  const docsUploaded = params.uploadedDocsCount ? `${params.uploadedDocsCount} of 7` : "7 of 7";

  const summaryData: ApplicationSummaryData = {
    applicationId: appId,
    incomeType,
    itrForm: formType,
    assessmentYear: assessmentYear.startsWith("AY") ? assessmentYear : `AY ${assessmentYear}`,
    documentsUploaded: docsUploaded,
    submissionDate: "10 Aug 2026",
    status: "Received",
  };

  const handleBack = () => {
    router.replace("/service/itr" as any);
  };

  const handleTrackStatus = () => {
    if (onTrackStatus) {
      onTrackStatus();
    } else {
      router.replace({
        pathname: "/(main)/home" as any,
      });
    }
  };

  const handleDownload = () => {
    if (onDownloadAcknowledgement) {
      onDownloadAcknowledgement();
    } else {
      Alert.alert(
        "Acknowledgement Downloaded",
        `Acknowledgement for ${appId} has been saved to your device.`
      );
    }
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
          <Text style={styles.headerTitle}>ITR Filing</Text>
          <Text style={styles.headerSubtitle}>Application Received</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 130 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header & ID Card */}
        <SuccessCelebrationHeader applicationId={appId} />

        {/* 6-Stage Progress Tracker */}
        <FilingProgressTracker />

        {/* What We Have Summary Card */}
        <ApplicationSummaryCard summary={summaryData} />

        {/* What Happens Next Card */}
        <WhatHappensNextCard />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTrackStatus}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>View Application Status</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleDownload}
          style={styles.secondaryButton}
        >
          <Ionicons name="download-outline" size={18} color="#F97316" />
          <Text style={styles.secondaryButtonText}>Download Acknowledgement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApplicationSuccessScreen;
