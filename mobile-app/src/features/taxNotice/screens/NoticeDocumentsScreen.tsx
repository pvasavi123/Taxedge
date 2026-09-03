import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { NoticeDocUploadCard } from "../components/documents/NoticeDocUploadCard";
import { MOCK_SUPPORTING_DOCS } from "../mock/taxNoticeData";
import { TaxNoticeSupportingDoc } from "../types/taxNotice.types";
import { styles } from "./NoticeDocumentsScreen.styles";

export const NoticeDocumentsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    noticeNumber?: string;
    assessmentYear?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2025–26";

  const [docs, setDocs] = useState<TaxNoticeSupportingDoc[]>(() =>
    MOCK_SUPPORTING_DOCS.map((doc) =>
      doc.id === "doc-ais"
        ? {
            ...doc,
            title: `AIS for ${assessmentYear}`,
          }
        : doc
    )
  );

  const [remarks, setRemarks] = useState("");

  const mandatoryDocs = docs.filter((d) => d.isMandatory);
  const uploadedMandatoryCount = mandatoryDocs.filter(
    (d) => d.status === "uploaded" || !!d.fileUri
  ).length;
  const totalMandatory = mandatoryDocs.length;
  const percent = totalMandatory > 0 ? (uploadedMandatoryCount / totalMandatory) * 100 : 0;

  const handleUploadSuccess = (
    id: string,
    fileInfo: { uri: string; name: string; size: string }
  ) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "uploaded",
              fileUri: fileInfo.uri,
              fileName: fileInfo.name,
              fileSize: fileInfo.size,
            }
          : d
      )
    );
  };

  const handleSubmitDocuments = () => {
    // Navigate to Screen 4: Review Response
    router.push({
      pathname: "/service/tax-notice-review" as any,
      params: {
        noticeNumber: params.noticeNumber,
        assessmentYear,
      },
    });
  };

  const getDocIcon = (index: number) => {
    switch (index) {
      case 0:
        return "document-text-outline" as const;
      case 1:
        return "document-text-outline" as const;
      case 2:
        return "business-outline" as const;
      case 3:
        return "document-outline" as const;
      case 4:
        return "bar-chart-outline" as const;
      case 5:
        return "pie-chart-outline" as const;
      default:
        return "document-outline" as const;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Upload Supporting Documents" />

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
          <Text style={styles.pageTitle}>We need a few more details</Text>
          <Text style={styles.pageSubtitle}>
            Upload the documents relevant to this notice. This helps your Tax
            Executive prepare the response.
          </Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <Text style={styles.counterText}>
            {uploadedMandatoryCount} of {totalMandatory} uploaded
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
        </View>

        {/* 6 Upload Cards */}
        {docs.map((doc, idx) => (
          <NoticeDocUploadCard
            key={doc.id}
            item={doc}
            iconName={getDocIcon(idx)}
            onUploadSuccess={handleUploadSuccess}
          />
        ))}

        {/* Remarks Input */}
        <View style={styles.remarksSection}>
          <Text style={styles.remarksLabel}>Remarks (Optional)</Text>
          <TextInput
            style={styles.remarksInput}
            placeholder="Add any additional information here..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            maxLength={500}
            value={remarks}
            onChangeText={setRemarks}
          />
          <Text style={styles.charCounter}>{remarks.length}/500</Text>
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
          onPress={handleSubmitDocuments}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit Documents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoticeDocumentsScreen;
