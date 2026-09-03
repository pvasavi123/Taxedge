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
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { NoticeTimelineTracker } from "../components/status/NoticeTimelineTracker";
import { NoticeFilingDetailsCard } from "../components/status/NoticeFilingDetailsCard";
import {
  MOCK_TRACKING_STEPS,
  MOCK_NOTICE_STATUS_DETAILS,
} from "../mock/taxNoticeData";
import { styles } from "./NoticeStatusScreen.styles";

export const NoticeStatusScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    noticeNumber?: string;
    assessmentYear?: string;
  }>();

  const details = {
    ...MOCK_NOTICE_STATUS_DETAILS,
    noticeNumber: params.noticeNumber || MOCK_NOTICE_STATUS_DETAILS.noticeNumber,
  };

  const handleBackToServices = () => {
    router.replace("/service/itr" as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Notice Status" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Success Illustration */}
        <View style={styles.successSection}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={30} color="#FFFFFF" />
          </View>
          <Text style={styles.successTitle}>
            Response Submitted Successfully
          </Text>
          <Text style={styles.successSubtitle}>
            Your response has been submitted to the Income Tax Department. We will
            keep you updated on any further communication.
          </Text>
        </View>

        {/* Vertical Stepper Timeline */}
        <NoticeTimelineTracker steps={MOCK_TRACKING_STEPS} />

        {/* Structured Details Card */}
        <NoticeFilingDetailsCard details={details} />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            We’ll notify you whenever there is an update from the Income Tax
            Department.
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
          onPress={handleBackToServices}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back to Tax Services</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoticeStatusScreen;
