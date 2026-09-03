import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProfessionOption } from "../types/profession.types";
import { PROFESSION_OPTIONS } from "../mock/professionData";
import { ProfessionHeaderCard } from "../components/ProfessionHeaderCard";
import { ProfessionGrid } from "../components/ProfessionGrid";
import { StartApplicationButton } from "../components/StartApplicationButton";
import { styles } from "./ProfessionSelectionScreen.styles";

interface ProfessionSelectionScreenProps {
  onContinue?: (selected: ProfessionOption) => void;
  initialSelectionId?: string;
}

export const ProfessionSelectionScreen: React.FC<ProfessionSelectionScreenProps> = ({
  onContinue,
  initialSelectionId = "salaried",
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    serviceType?: string;
    serviceTitle?: string;
    assessmentYear?: string;
  }>();

  const serviceTitle = params.serviceTitle || "ITR Filing";
  const assessmentYear = params.assessmentYear;

  const [selectedProfession, setSelectedProfession] = useState<ProfessionOption | null>(
    () => PROFESSION_OPTIONS.find((p) => p.id === initialSelectionId) || null
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(main)/home" as any);
    }
  };

  const handleStartApplication = () => {
    if (!selectedProfession) return;

    if (onContinue) {
      onContinue(selectedProfession);
    } else {
      // Continue to the next screen of the ITR workflow passing selected profession
      router.push({
        pathname: "/service/itr-income-info" as any,
        params: {
          professionId: selectedProfession.id,
          professionTitle: selectedProfession.title,
          formType: selectedProfession.formType,
          serviceType: params.serviceType,
          serviceTitle: params.serviceTitle,
          assessmentYear: params.assessmentYear,
        },
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.titleGroup}>
          <Text style={styles.headerTitle}>{serviceTitle}</Text>
          {assessmentYear ? (
            <Text style={styles.headerSubtitle}>{assessmentYear} Filing</Text>
          ) : null}
        </View>

        {/* Right spacer for centering */}
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 84 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Info Card */}
        <ProfessionHeaderCard />

        {/* 2-Column Profession Cards Grid */}
        <ProfessionGrid
          options={PROFESSION_OPTIONS}
          selectedId={selectedProfession?.id || null}
          onSelect={(item) => setSelectedProfession(item)}
        />
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <StartApplicationButton
        disabled={!selectedProfession}
        onPress={handleStartApplication}
      />
    </View>
  );
};

export default ProfessionSelectionScreen;

