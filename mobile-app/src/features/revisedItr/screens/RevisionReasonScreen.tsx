import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { RevisionReasonCard } from "../components/reason/RevisionReasonCard";
import { REVISION_REASONS } from "../mock/revisedItrData";
import { RevisionReasonId } from "../types/revisedItr.types";
import { styles } from "./RevisionReasonScreen.styles";

export const RevisionReasonScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
  }>();

  // "missed_income" is selected by default matching the reference screenshot
  const [selectedReason, setSelectedReason] =
    useState<RevisionReasonId>("missed_income");
  const [otherReasonText, setOtherReasonText] = useState("");
  const [otherError, setOtherError] = useState<string | null>(null);

  const selectedReasonObj = REVISION_REASONS.find((r) => r.id === selectedReason);

  const handleContinue = () => {
    if (selectedReason === "other" && !otherReasonText.trim()) {
      setOtherError("Please specify the reason for revision.");
      return;
    }

    setOtherError(null);

    // Navigate to Screen 3: Update Changed Details
    router.push({
      pathname: "/service/revised-itr-update" as any,
      params: {
        acknowledgementNumber: params.acknowledgementNumber,
        assessmentYear: params.assessmentYear || "AY 2025–26",
        revisionReason: selectedReason,
        otherReasonText: selectedReason === "other" ? otherReasonText : undefined,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Reason for Revision" />

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
          <Text style={styles.pageTitle}>What needs to be corrected?</Text>
          <Text style={styles.pageSubtitle}>
            This helps your Tax Executive understand what changed without a
            long written explanation.
          </Text>
        </View>

        {/* 4 Revision Reason Cards */}
        {REVISION_REASONS.map((item) => (
          <RevisionReasonCard
            key={item.id}
            item={item}
            isSelected={selectedReason === item.id}
            onSelect={(id) => {
              setSelectedReason(id);
              if (otherError) setOtherError(null);
            }}
          />
        ))}

        {/* Conditional Textarea for "Other" */}
        {selectedReason === "other" && (
          <View style={styles.otherInputGroup}>
            <Text style={styles.otherInputLabel}>
              Please describe what needs to be changed{" "}
              <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.otherTextInput,
                otherError ? styles.inputError : null,
              ]}
              placeholder="Provide a brief explanation of the corrections needed..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={otherReasonText}
              onChangeText={(text) => {
                setOtherReasonText(text);
                if (otherError) setOtherError(null);
              }}
            />
            {otherError ? (
              <Text style={styles.errorText}>{otherError}</Text>
            ) : null}
          </View>
        )}

        {/* Bottom Current Selection Info Box */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            Currently selected:{" "}
            <Text style={styles.boldText}>
              {selectedReasonObj?.title || "Missed income"}
            </Text>
            . You can change this later if needed.
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
          onPress={handleContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RevisionReasonScreen;
