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
import { UploadProgressHeader } from "../components/documents/UploadProgressHeader";
import { PreviousYearDocCard } from "../components/documents/PreviousYearDocCard";
import { KeepDocumentsReadyCard } from "../components/documents/KeepDocumentsReadyCard";
import { PREVIOUS_YEAR_DOCUMENTS } from "../mock/documentsData";
import { PreviousYearDocItem } from "../types/document.types";
import { styles } from "./PreviousYearDocumentsScreen.styles";

export const PreviousYearDocumentsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    assessmentYear?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2023–24";

  const [documents, setDocuments] = useState<PreviousYearDocItem[]>(() =>
    PREVIOUS_YEAR_DOCUMENTS.map((doc) =>
      doc.id === "form-16"
        ? {
            ...doc,
            title: `Form 16 / Form 16A\n(for ${assessmentYear})`,
          }
        : doc
    )
  );

  const uploadedCount = documents.filter(
    (d) => d.status === "uploaded" || !!d.fileUri
  ).length;
  const totalCount = documents.length;
  const isAllUploaded = uploadedCount === totalCount && totalCount > 0;

  const handleBack = () => {
    router.back();
  };

  const handleUploadSuccess = (
    id: string,
    fileInfo: { uri: string; name: string; size: string }
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: "uploaded",
              fileUri: fileInfo.uri,
              fileName: fileInfo.name,
              fileSize: fileInfo.size,
            }
          : doc
      )
    );
  };

  const handleSubmitApplication = () => {
    if (!isAllUploaded) {
      const missingTitles = documents
        .filter((d) => d.status !== "uploaded" && !d.fileUri)
        .map((d) => d.title.replace("\n", " "))
        .join(", ");

      Alert.alert(
        "Documents Required",
        `Please upload all required documents before submitting:\n\n${missingTitles}`
      );
      return;
    }

    // Navigate to Charges & Payment screen for Previous Year ITR
    router.push({
      pathname: "/service/previous-year-charges" as any,
      params: {
        assessmentYear,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Previous Year ITR</Text>
          <Text style={styles.headerSubtitle}>Documents & Submission</Text>
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
        {/* Section Heading */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Upload Required Documents</Text>
          <Text style={styles.pageSubtitle}>
            Upload all mandatory documents required for filing your Previous
            Year Income Tax Return.
          </Text>
        </View>

        {/* Upload Progress */}
        <UploadProgressHeader
          uploadedCount={uploadedCount}
          totalCount={totalCount}
        />

        {/* Document Cards */}
        {documents.map((doc) => (
          <PreviousYearDocCard
            key={doc.id}
            item={doc}
            onUploadSuccess={handleUploadSuccess}
          />
        ))}

        {/* Keep Documents Ready Information Card */}
        <KeepDocumentsReadyCard assessmentYear={assessmentYear} />
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmitApplication}
          disabled={!isAllUploaded}
          style={[
            styles.submitButton,
            isAllUploaded
              ? styles.submitButtonActive
              : styles.submitButtonDisabled,
          ]}
        >
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviousYearDocumentsScreen;
