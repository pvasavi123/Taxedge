import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  ScreenLayout,
  SCREEN_BOTTOM_PADDING,
} from "../../components/ScreenLayout";
import { Spacing } from "../../shared/theme";
import {
  useDocumentVaultStore,
  CATEGORY_DEFINITIONS,
  MainVaultView,
  DocumentUploadView,
} from "../../features/documents";
import { styles } from "../../styles/app/(main)/documents.styles";

export default function DocumentsScreen() {
  // viewMode: "VAULT" (1st image) | "UPLOAD" (2nd image)
  const [viewMode, setViewMode] = useState<"VAULT" | "UPLOAD">("VAULT");

  const selectedCategoryId = useDocumentVaultStore((state) => state.selectedCategoryId);
  const setSelectedCategoryId = useDocumentVaultStore((state) => state.setSelectedCategoryId);
  const categoryDocs = useDocumentVaultStore((state) => state.categoryDocs);
  const getDocumentsForCategory = useDocumentVaultStore((state) => state.getDocumentsForCategory);
  const uploadDocument = useDocumentVaultStore((state) => state.uploadDocument);
  const reuploadDocument = useDocumentVaultStore((state) => state.reuploadDocument);
  const deleteDocument = useDocumentVaultStore((state) => state.deleteDocument);

  const categoriesWithCounts = CATEGORY_DEFINITIONS.map((cat) => ({
    ...cat,
    fileCount: (categoryDocs[cat.id] || []).length,
  }));

  const activeCategory =
    CATEGORY_DEFINITIONS.find((c) => c.id === selectedCategoryId) ||
    CATEGORY_DEFINITIONS[0];

  const currentDocs = categoryDocs[selectedCategoryId] || [];

  const handleSelectCategoryFromVault = (catId: string) => {
    setSelectedCategoryId(catId);
    setViewMode("UPLOAD"); // Transition to 2nd Image view
  };

  const handleUpload = (docIdOrName: string, file: { name: string; size?: number; uri?: string }) => {
    uploadDocument(selectedCategoryId, docIdOrName, file);
  };

  const handleReupload = (docId: string) => {
    reuploadDocument(selectedCategoryId, docId);
  };

  const handleDelete = (docId: string) => {
    deleteDocument(selectedCategoryId, docId);
  };

  return (
    <ScreenLayout
      title={viewMode === "VAULT" ? "My Documents" : "Upload Documents"}
      showBack={viewMode === "UPLOAD"}
      onBack={() => setViewMode("VAULT")}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: SCREEN_BOTTOM_PADDING + Spacing.base },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.responsiveContainer}>
          {viewMode === "VAULT" ? (
            /* 1ST IMAGE UI: Main Document Vault & Categories List */
            <MainVaultView
              categories={categoriesWithCounts}
              onSelectCategory={handleSelectCategoryFromVault}
            />
          ) : (
            /* 2ND IMAGE UI: Upload Documents for Selected Category */
            <DocumentUploadView
              categoryTitle={activeCategory.name}
              categoryDescription={activeCategory.description}
              documents={currentDocs}
              onUploadFile={handleUpload}
              onReuploadFile={handleReupload}
              onDeleteFile={handleDelete}
              onContinueReview={() => setViewMode("VAULT")}
              showContinueButton={true}
              continueButtonText="Submit"
            />
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

