import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { DraftedResponseCard } from "../components/review/DraftedResponseCard";
import { MOCK_DRAFT_RESPONSE_TEXT } from "../mock/taxNoticeData";
import { styles } from "./ReviewNoticeResponseScreen.styles";

export const ReviewNoticeResponseScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    noticeNumber?: string;
    assessmentYear?: string;
  }>();

  // Checked by default matching reference screenshot
  const [isChecked, setIsChecked] = useState(true);

  const handleEditRequest = () => {
    Alert.alert(
      "Request Edits",
      "Please describe the edits you would like our Tax Executive to make in this response.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send to Executive",
          onPress: () => Alert.alert("Sent", "Your edit request has been sent to your Tax Executive."),
        },
      ]
    );
  };

  const handleApproveAndSubmit = () => {
    if (!isChecked) {
      Alert.alert(
        "Confirmation Required",
        "Please confirm that you have reviewed the response before submitting."
      );
      return;
    }

    // Navigate to Screen 5: Notice Status
    router.push({
      pathname: "/service/tax-notice-status" as any,
      params: {
        noticeNumber: params.noticeNumber || "CPC/2526/A3/284419260",
        assessmentYear: params.assessmentYear || "AY 2025–26",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Review Response" />

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
          <Text style={styles.pageTitle}>Please review our response</Text>
          <Text style={styles.pageSubtitle}>
            Your Tax Executive has prepared the following response to the Income
            Tax Department.
          </Text>
        </View>

        {/* Drafted Response Letter */}
        <DraftedResponseCard responseText={MOCK_DRAFT_RESPONSE_TEXT} />

        {/* Checkbox Section */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxRow}
        >
          <View style={[styles.checkbox, isChecked ? styles.checkboxActive : null]}>
            {isChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.checkboxLabel}>
            I have reviewed the response and confirm that the details are correct.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sticky Action Buttons */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleEditRequest}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleApproveAndSubmit}
            style={styles.approveButton}
          >
            <Text style={styles.approveButtonText}>Approve & Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReviewNoticeResponseScreen;
