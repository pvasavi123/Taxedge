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
import * as DocumentPicker from "expo-document-picker";
import { Spacing } from "../../../shared/theme";
import { BUSINESS_REQUIRED_DOCUMENTS } from "../mock/businessDocumentsData";
import { BusinessDocumentItem } from "../types/documentUpload.types";
import { UploadInstructionCard } from "../components/documents/UploadInstructionCard";
import { DocumentUploadCard } from "../components/documents/DocumentUploadCard";
import { MissingDocumentsBottomSheet } from "../components/documents/MissingDocumentsBottomSheet";
import { styles } from "./DocumentUploadScreen.styles";

interface DocumentUploadScreenProps {
  onContinue?: (documents: BusinessDocumentItem[]) => void;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({
  onContinue,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    professionId?: string;
    professionTitle?: string;
    panNumber?: string;
    aadhaarNumber?: string;
    assessmentYear?: string;
    incomeAmount?: string;
    sec80c?: string;
    sec80d?: string;
    homeLoan24b?: string;
    educationLoan80e?: string;
    otherDeductions?: string;
    previousFilingOption?: string;
  }>();

  const [documents, setDocuments] = useState<BusinessDocumentItem[]>(
    BUSINESS_REQUIRED_DOCUMENTS
  );
  const [showMissingSheet, setShowMissingSheet] = useState(false);

  // Upload count and progress calculation
  const uploadedCount = documents.filter(
    (d) => d.status === "uploaded" || d.status === "verified" || !!d.fileUri
  ).length;
  const totalCount = documents.length;
  const progressPercentage = Math.round((uploadedCount / totalCount) * 100);
  const isAllUploaded = uploadedCount === totalCount;

  const handleUploadSuccess = (
    id: string,
    fileInfo: { uri: string; name: string; size: string; mimeType?: string }
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
              mimeType: fileInfo.mimeType,
            }
          : doc
      )
    );
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: "not_uploaded",
              fileUri: undefined,
              fileName: undefined,
              fileSize: undefined,
              mimeType: undefined,
            }
          : doc
      )
    );
  };

  const handlePickDocumentDirectly = async (targetDoc: BusinessDocumentItem) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/jpeg", "image/png"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.size && asset.size > 10 * 1024 * 1024) {
          Alert.alert("File Too Large", "Maximum supported file size is 10 MB.");
          return;
        }

        const sizeInMb = asset.size
          ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
          : "2.4 MB";

        handleUploadSuccess(targetDoc.id, {
          uri: asset.uri,
          name: asset.name,
          size: sizeInMb,
          mimeType: asset.mimeType,
        });
      }
    } catch {
      Alert.alert("File Upload", "Could not select document.");
    }
  };

  const handleContinuePress = () => {
    if (!isAllUploaded) {
      setShowMissingSheet(true);
      return;
    }

    if (onContinue) {
      onContinue(documents);
    } else {
      // Continue to Tax Computation Review (Step 5)
      router.push({
        pathname: "/service/itr-review" as any,
        params: {
          ...params,
          uploadedDocsCount: uploadedCount.toString(),
        },
      });
    }
  };

  const pendingDocuments = documents.filter(
    (d) => d.status === "not_uploaded" && !d.fileUri
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>ITR Filing</Text>
          <Text style={styles.headerSubtitle}>Upload Business Documents</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Progress Block */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTopRow}>
          <Text style={styles.progressCountText}>
            {uploadedCount} of {totalCount} Uploaded
          </Text>
          <View style={styles.inProgressBar}>
            <Text style={styles.inProgressText}>In Progress</Text>
          </View>
        </View>

        <View style={styles.progressBottomRow}>
          <Text style={styles.progressPercentageText}>{progressPercentage}%</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 104 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Instruction Card */}
        <UploadInstructionCard />

        {/* 7 Required Documents Cards */}
        {documents.map((doc) => (
          <DocumentUploadCard
            key={doc.id}
            item={doc}
            onUploadSuccess={handleUploadSuccess}
            onRemove={handleRemoveDocument}
          />
        ))}
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, Spacing.md) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinuePress}
          style={[
            styles.continueButton,
            isAllUploaded ? styles.continueActive : styles.continueDisabled,
          ]}
        >
          <Text style={styles.continueButtonText}>Continue to Review</Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        {!isAllUploaded && (
          <View style={styles.lockHintRow}>
            <Ionicons name="lock-closed-outline" size={13} color="#64748B" />
            <Text style={styles.lockHintText}>
              Upload all 7 documents to continue
            </Text>
          </View>
        )}
      </View>

      {/* Missing Documents Bottom Sheet */}
      <MissingDocumentsBottomSheet
        visible={showMissingSheet}
        pendingDocuments={pendingDocuments}
        onUploadItem={handlePickDocumentDirectly}
        onClose={() => setShowMissingSheet(false)}
      />
    </View>
  );
};

export default DocumentUploadScreen;

