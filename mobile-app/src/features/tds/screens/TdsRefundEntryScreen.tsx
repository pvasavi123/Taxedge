import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TdsHeroCard } from "../components/TdsHeroCard";
import { TdsBenefitsGrid } from "../components/TdsBenefitsGrid";
import { TdsProcessTimeline } from "../components/TdsProcessTimeline";
import { TdsDocumentsGrid } from "../components/TdsDocumentsGrid";
import { TdsInfoBanner } from "../components/TdsInfoBanner";
import { styles } from "./TdsRefundEntryScreen.styles";

export const TdsRefundEntryScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStart = () => {
    // Navigate to Document Checklist screen in TDS Refund workflow
    router.push({
      pathname: "/service/tds-checklist" as any,
    });
  };

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

        <Text style={styles.headerTitle}>TDS Refund</Text>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Navy Hero Card */}
        <TdsHeroCard />

        {/* Why choose TaxEdge? 2x2 Grid */}
        <TdsBenefitsGrid />

        {/* How it works 5-Step Timeline */}
        <TdsProcessTimeline />

        {/* Documents Required 8 Chips */}
        <TdsDocumentsGrid />

        {/* Info Banner */}
        <TdsInfoBanner />
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStart}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Start TDS Refund</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TdsRefundEntryScreen;
