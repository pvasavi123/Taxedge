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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { ReturnSummaryCard } from "../components/find/ReturnSummaryCard";
import { MOCK_ORIGINAL_RETURN } from "../mock/revisedItrData";
import { OriginalReturnDetails } from "../types/revisedItr.types";
import { styles } from "./FindOriginalReturnScreen.styles";

export const FindOriginalReturnScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [ackNumber, setAckNumber] = useState("284419250714208");
  const [assessmentYear, setAssessmentYear] = useState("AY 2025–26");
  const [showAyDropdown, setShowAyDropdown] = useState(false);
  const [foundReturn, setFoundReturn] = useState<OriginalReturnDetails | null>(
    MOCK_ORIGINAL_RETURN
  );
  const [error, setError] = useState<string | null>(null);

  const ayOptions = ["AY 2025–26", "AY 2024–25", "AY 2023–24"];

  const handleFindReturn = () => {
    // 15-digit numeric validation
    const cleaned = ackNumber.trim();
    if (!cleaned) {
      setError("Please enter the 15-digit Acknowledgement Number.");
      return;
    }
    if (!/^\d{15}$/.test(cleaned)) {
      setError("Acknowledgement Number must be exactly 15 digits.");
      return;
    }

    setError(null);
    setFoundReturn({
      ...MOCK_ORIGINAL_RETURN,
      acknowledgementNumber: cleaned,
      assessmentYear,
    });
  };

  const handleContinue = () => {
    if (!foundReturn) {
      handleFindReturn();
      return;
    }

    // Navigate to Screen 2: Reason for Revision
    router.push({
      pathname: "/service/revised-itr-reason" as any,
      params: {
        acknowledgementNumber: foundReturn.acknowledgementNumber,
        assessmentYear: foundReturn.assessmentYear,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Find Original Return" />

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
          <Text style={styles.pageTitle}>Let’s find your original return</Text>
          <Text style={styles.pageSubtitle}>
            The Income Tax Department requires a revision to be linked to the
            exact original filing.
          </Text>
        </View>

        {/* Input: Acknowledgement Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Original ITR Acknowledgement Number <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[styles.textInput, error ? styles.inputError : null]}
            placeholder="Enter 15-digit acknowledgement number"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={15}
            value={ackNumber}
            onChangeText={(val) => {
              setAckNumber(val);
              if (error) setError(null);
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Input: Assessment Year Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Assessment Year it was filed for <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAyDropdown(!showAyDropdown)}
            style={styles.dropdownSelector}
          >
            <Text style={styles.dropdownValue}>{assessmentYear}</Text>
            <Ionicons
              name={showAyDropdown ? "chevron-up" : "chevron-down"}
              size={18}
              color="#64748B"
            />
          </TouchableOpacity>

          {showAyDropdown && (
            <View style={styles.dropdownMenu}>
              {ayOptions.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  activeOpacity={0.7}
                  onPress={() => {
                    setAssessmentYear(opt);
                    setShowAyDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      assessmentYear === opt ? styles.dropdownItemActive : null,
                    ]}
                  >
                    {opt}
                  </Text>
                  {assessmentYear === opt && (
                    <Ionicons name="checkmark" size={16} color="#F97316" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            You can find the acknowledgement number in your previously filed ITR
            acknowledgement.
          </Text>
        </View>

        {/* Return Summary Card if Found */}
        {foundReturn && <ReturnSummaryCard details={foundReturn} />}
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
          onPress={foundReturn ? handleContinue : handleFindReturn}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>
            {foundReturn ? "Continue" : "Find My Return"}
          </Text>
          {foundReturn && (
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindOriginalReturnScreen;
