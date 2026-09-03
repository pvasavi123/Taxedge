import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PreviousYearHeader } from "../components/PreviousYearHeader";
import { AssessmentYearSelector } from "../components/AssessmentYearSelector";
import { ContinueButton } from "../components/ContinueButton";
import { ASSESSMENT_YEARS } from "../mock/assessmentYearsData";
import { styles } from "./PreviousYearSelectionScreen.styles";

export const PreviousYearSelectionScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // AY 2023-24 is selected by default as in the design specification
  const [selectedYearId, setSelectedYearId] = useState<string>("ay-2023-24");

  const selectedItem = ASSESSMENT_YEARS.find((y) => y.id === selectedYearId);
  const isEligibleSelected = !!selectedItem && selectedItem.isEligible;

  const handleSelectYear = (id: string) => {
    setSelectedYearId(id);
  };

  const handleContinue = () => {
    if (!isEligibleSelected) return;

    // Navigate to next screen: Previous Year ITR Details
    router.push({
      pathname: "/service/previous-year-itr-details" as any,
      params: {
        assessmentYear: selectedItem?.year || "AY 2023–24",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <PreviousYearHeader />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <AssessmentYearSelector
          items={ASSESSMENT_YEARS}
          selectedId={selectedYearId}
          onSelectYear={handleSelectYear}
        />
      </ScrollView>

      {/* Sticky Bottom Continue Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <ContinueButton
          onPress={handleContinue}
          disabled={!isEligibleSelected}
        />
      </View>
    </View>
  );
};

export default PreviousYearSelectionScreen;
