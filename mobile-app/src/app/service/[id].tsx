import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { Spacing } from "../../shared/theme";
import { getServiceById } from "../../data/services";
import { useApplicationStore } from "../../store/applicationStore";
import { useNotificationStore } from "../../store/notificationStore";
import { AppHeader } from "../../components/AppHeader";
import { DynamicForm } from "../../components/DynamicForm";
import { PrimaryButton } from "../../components/PrimaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../styles/app/service/[id].styles";
import type { ApplicationFormData, NotificationType } from "../../types/domain";

type ServiceTab = "Overview" | "Documents" | "Benefits";

export default function ServiceDetailScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const service = getServiceById(id || "");

  const createApplication = useApplicationStore((state) => state.createApplication);
  const addNotification = useNotificationStore((state) => state.addNotification);

  // UI state for details tabs & form toggle
  const [activeTab, setActiveTab] = useState<ServiceTab>("Overview");
  const [showForm, setShowForm] = useState(false);

  if (!service) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <AppHeader title="Service Not Found" showBack />
        <View style={styles.errorContent}>
          <Ionicons name="warning-outline" size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>Service details could not be loaded.</Text>
        </View>
      </View>
    );
  }

  const handleFormSubmit = (formData: ApplicationFormData) => {
    // Generate simulated application fee
    const paymentAmount = service.category === "GST" ? 2500 : service.category === "ITR" ? 1800 : service.category === "LOANS" ? 1130 : 0;
    
    // Create application in Zustand store
    const appId = createApplication(
      service.id,
      service.name,
      service.category,
      formData,
      service.requiredDocs,
      paymentAmount
    );

    // Create notification
    addNotification(
      "Application Submitted",
      `Your request for ${service.name} (${appId}) has been registered.`,
      service.category.toLowerCase() as NotificationType
    );

    Alert.alert(
      "Application Registered",
      `Application ${appId} has been successfully created. Please upload the required documents to start processing.`,
      [
        {
          text: "Upload Documents",
          onPress: () => {
            useApplicationStore.getState().setSelectedApplicationId(appId);
            router.replace(`/application/${appId}`);
          }
        }
      ]
    );
  };

  const getBenefits = () => {
    switch (service.category) {
      case "LOANS":
        return ["✓ Fast approval within 48 hours", "✓ Minimal documentation required", "✓ High loan eligibility margins", "✓ Competitive interest rates", "✓ Flexible repayment tenures"];
      case "GST":
        return ["✓ Error-free compliance checks", "✓ End-to-end filing with verification", "✓ Dedicated compliance officers", "✓ Regular updates and notifications", "✓ Timely filing to avoid penalties"];
      case "ITR":
        return ["✓ Maximize deductions & tax savings", "✓ Fast refund processing tracking", "✓ Professional Chartered Accountant review", "✓ Secure data encryption", "✓ Support for tax notices"];
      default:
        return ["✓ Professional business support", "✓ Secure document vaults", "✓ Fast turnaround times", "✓ Dedicated service managers", "✓ Complete compliance protection"];
    }
  };

  // 1. Render Card 5 style (Application Form Wizard)
  if (showForm) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={{ backgroundColor: colors.primaryDark, paddingTop: insets.top }}>
          <View style={styles.formWizardHeader}>
            <TouchableOpacity onPress={() => setShowForm(false)} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.formWizardTitle}>{service.name} Application</Text>
          </View>
        </View>

        {/* Progress indicator bar at the top */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.primary }]} />
        </View>

        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.formSectionTitle, { color: colors.primary }]}>Applicant Information</Text>
            <Text style={[styles.formSectionSub, { color: colors.textSecondary }]}>Provide identity details matching official documents.</Text>
            
            <DynamicForm
              fields={service.formFields}
              onSubmit={handleFormSubmit}
              submitButtonText="Continue →"
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  // 2. Render Card 4 style (Service Details tabbed page)
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title={service.name} showBack />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]} showsVerticalScrollIndicator={false}>
        {/* Service Header Info Block */}
        <View style={[styles.detailHero, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={styles.heroRow}>
            <View style={[styles.iconBg, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name={service.icon} size={28} color={colors.orange} />
            </View>
            <View style={styles.heroTextContainer}>
              <Text style={[styles.heroTitle, { color: colors.text }]}>{service.name}</Text>
              <Text style={[styles.heroCategory, { color: colors.primary }]}>{service.category} Category</Text>
            </View>
          </View>
          <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>{service.description}</Text>
        </View>

        {/* Tab Buttons (Overview, Documents, Benefits) */}
        <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
          {(["Overview", "Documents", "Benefits"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabItem, isSelected && { borderBottomColor: colors.primary }]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isSelected ? colors.primary : colors.textSecondary,
                      fontWeight: isSelected ? "700" : "500",
                    },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content Cards */}
        {activeTab === "Overview" && (
          <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.cardSectionTitle, { color: colors.text }]}>Service Overview</Text>
            <Text style={[styles.overviewContentText, { color: colors.textSecondary }]}>
              TaxEdge Fin Solutions provides professional compliance assistance for {service.name}. Our experienced executives handle drafting, compiling, verifying, and submitting files directly to government portal nodes, ensuring 100% accuracy and complete protection against late penalties.
            </Text>
          </View>
        )}

        {activeTab === "Documents" && (
          <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.cardSectionTitle, { color: colors.text }]}>Required Documents</Text>
            <Text style={[styles.cardSectionSub, { color: colors.textSecondary }]}>
              You will need to scan and upload these files after form submission:
            </Text>
            <View style={styles.checklist}>
              {service.requiredDocs.map((doc, idx) => (
                <View key={idx} style={styles.checkRow}>
                  <Ionicons name="checkbox" size={18} color={colors.primary} />
                  <Text style={[styles.checklistText, { color: colors.text }]}>{doc}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === "Benefits" && (
          <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.cardSectionTitle, { color: colors.text }]}>Benefits & Advantages</Text>
            <Text style={[styles.cardSectionSub, { color: colors.textSecondary }]}>
              Why choose TaxEdge Fin Solutions:
            </Text>
            <View style={styles.checklist}>
              {getBenefits().map((benefit, idx) => (
                <View key={idx} style={styles.checkRow}>
                  <Ionicons name="sparkles" size={16} color={colors.orange} />
                  <Text style={[styles.checklistText, { color: colors.text }]}>{benefit.substring(2)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Start Application Sticky Bottom Button */}
      <View style={[styles.bottomButtonContainer, { backgroundColor: colors.backgroundElement, borderTopColor: colors.border, paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        <PrimaryButton
          title="Start Application"
          onPress={() => setShowForm(true)}
          colorType="orange"
        />
      </View>
    </View>
  );
}

