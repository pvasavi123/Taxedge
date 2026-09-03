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
import * as DocumentPicker from "expo-document-picker";
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { REVISED_SUPPORTING_DOCUMENTS } from "../mock/revisedItrData";
import { RevisedDocumentItem } from "../types/revisedItr.types";
import { styles } from "./RevisedDocumentsScreen.styles";

export const RevisedDocumentsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
    revisionReason?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2025–26";

  const [documents, setDocuments] = useState<RevisedDocumentItem[]>(() =>
    REVISED_SUPPORTING_DOCUMENTS.map((doc) =>
      doc.id === "doc-3"
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
  const isCompleted = uploadedCount === totalCount && totalCount > 0;
  const percent = totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0;

  const handlePickDocument = async (id: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/jpeg", "image/png"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        // 10 MB limit check
        if (asset.size && asset.size > 10 * 1024 * 1024) {
          Alert.alert("File Too Large", "Maximum supported file size is 10 MB.");
          return;
        }

        const sizeInMb = asset.size
          ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
          : "2.1 MB";

        setDocuments((prev) =>
          prev.map((d) =>
            d.id === id
              ? {
                  ...d,
                  status: "uploaded",
                  fileUri: asset.uri,
                  fileName: asset.name,
                  fileSize: sizeInMb,
                }
              : d
          )
        );
      }
    } catch {
      Alert.alert("Upload Error", "Could not open file picker.");
    }
  };

  const handleContinue = () => {
    // Navigate to Screen 5: Review Revised Computation
    router.push({
      pathname: "/service/revised-itr-review" as any,
      params: {
        acknowledgementNumber: params.acknowledgementNumber,
        assessmentYear,
        revisionReason: params.revisionReason,
      },
    });
  };

  const getDocIcon = (index: number) => {
    switch (index) {
      case 0:
        return "person-circle-outline" as const;
      case 1:
        return "card-outline" as const;
      case 2:
        return "document-text-outline" as const;
      case 3:
        return "bar-chart-outline" as const;
      case 4:
        return "business-outline" as const;
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
      <RevisedItrHeader subtitle="Documents & Submission" />

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
          <Text style={styles.pageTitle}>Upload Required Documents</Text>
          <Text style={styles.pageSubtitle}>
            Upload all mandatory documents required for your Revised Income Tax
            Return.
          </Text>
        </View>

        {/* Upload Progress Header */}
        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            <Text style={styles.counterText}>
              {uploadedCount} of {totalCount} Documents Uploaded
            </Text>
            <View style={styles.inProgressBadge}>
              <Text style={styles.inProgressText}>
                {isCompleted ? "Completed" : "In Progress"}
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
        </View>

        {/* 6 Document Cards */}
        {documents.map((doc, idx) => {
          const isUploaded = doc.status === "uploaded" || !!doc.fileUri;

          return (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.iconCircle}>
                <Ionicons name={getDocIcon(idx)} size={22} color="#0B1F3A" />
              </View>

              <View style={styles.docTextGroup}>
                <Text style={styles.docTitle}>{doc.title}</Text>
                <Text style={styles.docSubtitle} numberOfLines={1}>
                  {isUploaded && doc.fileName
                    ? `${doc.fileName} • ${doc.fileSize || "2.1 MB"}`
                    : doc.subtitle}
                </Text>
              </View>

              {isUploaded ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePickDocument(doc.id)}
                  style={styles.uploadedBadge}
                >
                  <Ionicons name="checkmark" size={14} color="#EA580C" />
                  <Text style={styles.uploadedText}>Uploaded</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePickDocument(doc.id)}
                  style={styles.uploadButton}
                >
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {/* Keep Documents Ready Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoTitle}>Keep Documents Ready</Text>
            <Text style={styles.infoDescription}>
              Ensure the documents are clear, readable and belong to {assessmentYear}.
            </Text>
          </View>
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

export default RevisedDocumentsScreen;
