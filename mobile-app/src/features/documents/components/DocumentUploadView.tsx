import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { BrandColors } from "../../../shared/theme";
import { styles } from "./DocumentUploadView.styles";
import type { DocumentItem, DocumentWorkflowStatus } from "../types/documentTypes";

export interface DocumentUploadViewProps {
  categoryTitle?: string;
  categoryDescription?: string;
  documents: DocumentItem[];
  onUploadFile: (docIdOrName: string, file: { name: string; size?: number; uri?: string }) => void;
  onReuploadFile?: (docId: string) => void;
  onDeleteFile?: (docId: string) => void;
  onContinueReview?: () => void;
  showContinueButton?: boolean;
  continueButtonText?: string;
}

export const DocumentUploadView: React.FC<DocumentUploadViewProps> = ({
  categoryTitle = "Upload Documents",
  categoryDescription,
  documents,
  onUploadFile,
  onReuploadFile,
  onDeleteFile,
  onContinueReview,
  showContinueButton = true,
  continueButtonText = "Submit",
}) => {
  const [activeUploadingId, setActiveUploadingId] = useState<string | null>(null);

  const confirmDelete = (docId: string, docName: string) => {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.confirm(`Delete "${docName}"?`)) {
        onDeleteFile && onDeleteFile(docId);
      }
    } else {
      Alert.alert(
        "Delete Document",
        `Are you sure you want to delete "${docName}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => onDeleteFile && onDeleteFile(docId),
          },
        ]
      );
    }
  };

  // Pick file from device storage
  const handleBrowseFiles = async (targetDocIdOrName?: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      const isCanceled = (result as any).canceled === true || (result as any).type === "cancel";
      if (!isCanceled) {
        const file =
          (result as any).assets && (result as any).assets.length > 0
            ? (result as any).assets[0]
            : (result as any);

        const fileName = file.name || "Document.pdf";
        const fileSize = file.size || (file as any).fileSize || 1024 * 1024 * 1.8;
        const fileUri = file.uri;

        const target = targetDocIdOrName || `doc-${Date.now()}`;
        onUploadFile(target, { name: fileName, size: fileSize, uri: fileUri });
      }
    } catch (err) {
      console.warn("Browse files error:", err);
    }
  };

  // Pick or scan using Camera
  const handleCamera = async (targetDocIdOrName?: string) => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        // Fallback to media library if camera permission is denied / unavailable on web
        const libRes = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
        if (!libRes.canceled && libRes.assets?.[0]) {
          const file = libRes.assets[0];
          const fileName = file.fileName || `Scan_${Date.now()}.jpg`;
          const target = targetDocIdOrName || `doc-${Date.now()}`;
          onUploadFile(target, { name: fileName, size: file.fileSize, uri: file.uri });
        }
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
      if (!result.canceled && result.assets?.[0]) {
        const file = result.assets[0];
        const fileName = file.fileName || `Scan_${Date.now()}.jpg`;
        const target = targetDocIdOrName || `doc-${Date.now()}`;
        onUploadFile(target, { name: fileName, size: file.fileSize, uri: file.uri });
      }
    } catch (err) {
      console.warn("Camera error:", err);
    }
  };

  const handleScanDocument = () => handleCamera();

  return (
    <View style={styles.container}>
      {/* 1. TOP DASHED UPLOAD DROPZONE CARD */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleBrowseFiles()}
        style={styles.dropzone}
      >
        <View style={styles.cloudBadge}>
          <Ionicons name="cloud-upload" size={24} color={BrandColors.WHITE} />
        </View>
        <Text style={styles.dropzoneTitle}>Upload Document</Text>
        <Text style={styles.dropzoneSub}>PDF, JPG, PNG, Excel or Word</Text>
        <Text style={styles.dropzoneNote}>Max file size: 10 MB per document</Text>
      </TouchableOpacity>

      {/* 2. ACTION BUTTONS ROW: Browse Files | Scan Document */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => handleBrowseFiles()}
          style={styles.actionPillBtn}
        >
          <Ionicons name="folder" size={18} color="#F59E0B" />
          <Text style={styles.actionPillText}>Browse Files</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleScanDocument}
          style={styles.actionPillBtn}
        >
          <Ionicons name="camera" size={18} color="#475569" />
          <Text style={styles.actionPillText}>Scan Document</Text>
        </TouchableOpacity>
      </View>

      {/* 3. SECTION TITLE: Uploaded Documents */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Uploaded Documents</Text>
        {categoryDescription && (
          <Text style={styles.sectionSub}>{categoryDescription}</Text>
        )}
      </View>

      {/* 4. DOCUMENT CARDS (THE EXACT SECOND-IMAGE CARD DESIGN) */}
      {documents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cloud-upload-outline" size={26} color="#EA580C" />
          </View>
          <Text style={styles.emptyTitle}>No documents uploaded</Text>
          <Text style={styles.emptySub}>
            Tap "Browse Files" or "Scan Document" above to upload
          </Text>
        </View>
      ) : (
        <View style={styles.docList}>
          {documents.map((doc) => {
            const isUploading = activeUploadingId === doc.id || doc.status === "UPLOADING";
            const isVerified = doc.status === "VERIFIED";
          const isRejected = doc.status === "REJECTED";
          const isNotUploaded = doc.status === "NOT_UPLOADED";
          const isUnderReview = doc.status === "UNDER_VERIFICATION" || (doc.status as string) === "Under Review" || doc.status === "UPLOADED";

          const isPdf = doc.fileType === "pdf" || doc.fileName?.endsWith(".pdf");
          const isExcel = doc.fileType === "xlsx" || doc.fileName?.endsWith(".xlsx");

          return (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docCardTop}>
                {/* Left File Icon */}
                <View
                  style={[
                    styles.fileIconBadge,
                    {
                      backgroundColor: isPdf ? "#FFF1E6" : "#EFF6FF",
                      borderColor: isPdf ? "#FED7AA" : "#DBEAFE",
                    },
                  ]}
                >
                  <Ionicons
                    name={isPdf ? "document-text-outline" : isExcel ? "grid-outline" : "document-outline"}
                    size={22}
                    color={isPdf ? "#EA580C" : "#083B75"}
                  />
                </View>

                {/* Middle File Info */}
                <View style={styles.docInfo}>
                  <Text style={styles.docFileName} numberOfLines={1}>
                    {doc.fileName || doc.name}
                  </Text>
                  <Text style={styles.docMeta}>
                    {doc.fileSize || "1.8 MB"}
                    {doc.uploadDate && !isNotUploaded ? ` • ${doc.uploadDate}` : ""}
                  </Text>
                </View>

                {/* Right Status Badge / Action */}
                <View style={styles.statusWrap}>
                  <View style={styles.statusRow}>
                    {isNotUploaded && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleBrowseFiles(doc.id)}
                        style={styles.uploadMiniBtn}
                      >
                        <Ionicons name="arrow-up" size={13} color="#F97316" />
                        <Text style={styles.uploadMiniBtnText}>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {isUploading && (
                      <View style={styles.orangeBadge}>
                        <Text style={styles.orangeBadgeText}>Uploading...</Text>
                      </View>
                    )}

                    {isUnderReview && (
                      <View style={styles.orangeBadge}>
                        <Text style={styles.orangeBadgeText}>Under Review</Text>
                      </View>
                    )}

                    {isVerified && (
                      <View style={styles.greenBadge}>
                        <Ionicons name="checkmark-circle" size={13} color="#15803D" />
                        <Text style={styles.greenBadgeText}>Verified</Text>
                      </View>
                    )}

                    {isRejected && (
                      <View style={styles.redBadge}>
                        <Ionicons name="close-circle" size={13} color="#DC2626" />
                        <Text style={styles.redBadgeText}>Rejected</Text>
                      </View>
                    )}

                    {onDeleteFile && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => confirmDelete(doc.id, doc.fileName || doc.name)}
                        hitSlop={8}
                        style={styles.deleteIconBtn}
                      >
                        <Ionicons name="trash-outline" size={16} color={BrandColors.PRIMARY_ORANGE_DARK} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>

              {/* Orange Progress Bar (Under Review / Uploading) */}
              {(isUnderReview || isUploading) && (
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${doc.progress || 60}%` as any },
                    ]}
                  />
                </View>
              )}

              {/* Rejection notice & Re-upload button if rejected */}
              {isRejected && (
                <View style={styles.rejectedContainer}>
                  <Text style={styles.rejectedReasonText}>
                    {doc.rejectionReason || "Document could not be verified."}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => (onReuploadFile ? onReuploadFile(doc.id) : handleBrowseFiles(doc.id))}
                    style={styles.reuploadBtn}
                  >
                    <Ionicons name="refresh" size={13} color={BrandColors.WHITE} />
                    <Text style={styles.reuploadBtnText}>Re-upload</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>
      )}

      {/* 5. NOTICE / INSTRUCTIONS CALLOUT BANNER */}
      <View style={styles.noticeBanner}>
        <View style={styles.noticeIconWrap}>
          <Ionicons name="information-circle-outline" size={20} color={BrandColors.PRIMARY_ORANGE_DARK} />
        </View>
        <Text style={styles.noticeText}>
          Ensure all documents are clear, readable and not expired. Blurry or cropped documents may cause delays.
        </Text>
      </View>

      {/* 6. BOTTOM ORANGE PRIMARY BUTTON */}
      {showContinueButton && (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onContinueReview}
          style={styles.primaryContinueBtn}
        >
          <Text style={styles.primaryContinueBtnText}>{continueButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
