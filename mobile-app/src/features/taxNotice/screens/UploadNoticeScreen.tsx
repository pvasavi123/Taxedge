import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { NoticeUploadCard } from "../components/upload/NoticeUploadCard";
import { TaxNoticeUploadFormData } from "../types/taxNotice.types";
import { styles } from "./UploadNoticeScreen.styles";

export const UploadNoticeScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState<TaxNoticeUploadFormData>({
    noticeNumber: "CPC/2526/A3/284419260",
    noticeDate: "18 Aug 2026",
    assessmentYear: "AY 2025–26",
    noticeFileName: "IT_Notice_143_1_a.pdf",
    noticeFileSize: "2.4 MB",
  });

  const [showAyDropdown, setShowAyDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ayOptions = ["AY 2025–26", "AY 2024–25", "AY 2023–24"];

  const handleUploadSuccess = (fileInfo: {
    uri: string;
    name: string;
    size: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      noticeFileUri: fileInfo.uri,
      noticeFileName: fileInfo.name,
      noticeFileSize: fileInfo.size,
    }));
    if (errors.file) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.file;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.noticeFileName) {
      newErrors.file = "Please upload your Income Tax notice document.";
    }

    if (!formData.noticeNumber.trim()) {
      newErrors.noticeNumber = "Notice number is required.";
    }

    if (!formData.noticeDate.trim()) {
      newErrors.noticeDate = "Notice date is required.";
    }

    if (!formData.assessmentYear.trim()) {
      newErrors.assessmentYear = "Assessment year is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    // Navigate to Screen 2: Notice Summary
    router.push({
      pathname: "/service/tax-notice-summary" as any,
      params: {
        noticeNumber: formData.noticeNumber,
        noticeDate: formData.noticeDate,
        assessmentYear: formData.assessmentYear,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Upload Tax Notice" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Upload your Income Tax notice</Text>
          <Text style={styles.pageSubtitle}>
            Upload your Income Tax notice and we’ll help you respond correctly.
          </Text>
        </View>

        {/* Upload Card */}
        <NoticeUploadCard
          fileName={formData.noticeFileName}
          fileSize={formData.noticeFileSize}
          onUploadSuccess={handleUploadSuccess}
          error={errors.file}
        />
        {errors.file ? <Text style={styles.errorText}>{errors.file}</Text> : null}

        {/* Field 1: Notice Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Notice Number <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={[styles.textInput, errors.noticeNumber ? styles.inputError : null]}
            placeholder="Enter notice number"
            placeholderTextColor="#94A3B8"
            value={formData.noticeNumber}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, noticeNumber: text }));
              if (errors.noticeNumber) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.noticeNumber;
                  return next;
                });
              }
            }}
          />
          <Text style={styles.inputHint}>e.g. CPC/2526/A3/284419260</Text>
          {errors.noticeNumber ? (
            <Text style={styles.errorText}>{errors.noticeNumber}</Text>
          ) : null}
        </View>

        {/* Field 2: Notice Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Notice Date <Text style={styles.requiredStar}>*</Text>
          </Text>
          <View
            style={[
              styles.dateInputWrapper,
              errors.noticeDate ? styles.inputError : null,
            ]}
          >
            <TextInput
              style={styles.dateTextInput}
              placeholder="Select notice date"
              placeholderTextColor="#94A3B8"
              value={formData.noticeDate}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, noticeDate: text }));
                if (errors.noticeDate) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.noticeDate;
                    return next;
                  });
                }
              }}
            />
            <Ionicons name="calendar-outline" size={20} color="#0B1F3A" />
          </View>
          {errors.noticeDate ? (
            <Text style={styles.errorText}>{errors.noticeDate}</Text>
          ) : null}
        </View>

        {/* Field 3: Assessment Year */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Assessment Year <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAyDropdown(!showAyDropdown)}
            style={styles.dropdownSelector}
          >
            <Text style={styles.dropdownValue}>{formData.assessmentYear}</Text>
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
                    setFormData((prev) => ({ ...prev, assessmentYear: opt }));
                    setShowAyDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      formData.assessmentYear === opt
                        ? styles.dropdownItemActive
                        : null,
                    ]}
                  >
                    {opt}
                  </Text>
                  {formData.assessmentYear === opt && (
                    <Ionicons name="checkmark" size={16} color="#F97316" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Notice Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            You can find the notice number, date and assessment year on the top
            of your Income Tax notice.
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

export default UploadNoticeScreen;
