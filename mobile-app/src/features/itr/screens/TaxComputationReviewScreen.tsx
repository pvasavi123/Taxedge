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
import { ComputationInfoBanner } from "../components/computation/ComputationInfoBanner";
import { RefundHeroCard } from "../components/computation/RefundHeroCard";
import { TaxSummaryCard } from "../components/computation/TaxSummaryCard";
import { ReturnDetailsCard } from "../components/computation/ReturnDetailsCard";
import { ImportantNotesCard } from "../components/computation/ImportantNotesCard";
import { ConfirmApprovalModal } from "../components/computation/ConfirmApprovalModal";
import { RequestChangesBottomSheet } from "../components/computation/RequestChangesBottomSheet";
import { styles } from "./TaxComputationReviewScreen.styles";
import {
  DEFAULT_COMPUTATION_DATA,
  DEFAULT_RETURN_DETAILS,
} from "../mock/computationData";

export const TaxComputationReviewScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    professionId?: string;
    professionTitle?: string;
    applicationId?: string;
    assessmentYear?: string;
    formType?: string;
  }>();

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRequestSheet, setShowRequestSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const returnDetails = {
    applicationId: params.applicationId || DEFAULT_RETURN_DETAILS.applicationId,
    incomeType: params.professionTitle || DEFAULT_RETURN_DETAILS.incomeType,
    itrForm: params.formType || DEFAULT_RETURN_DETAILS.itrForm,
    assessmentYear: params.assessmentYear || DEFAULT_RETURN_DETAILS.assessmentYear,
    status: DEFAULT_RETURN_DETAILS.status,
    preparedBy: DEFAULT_RETURN_DETAILS.preparedBy,
  };

  const handleApproveAndFile = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApprovalModal(false);

      // Navigate to Return Filed / E-Verification Screen
      router.replace({
        pathname: "/service/itr-filed" as any,
        params: {
          applicationId: returnDetails.applicationId,
          professionTitle: returnDetails.incomeType,
          formType: returnDetails.itrForm,
          assessmentYear: returnDetails.assessmentYear,
          refundAmount: "₹29,585",
        },
      });
    }, 1200);
  };

  const handleChangesSubmitted = (comments: string, selectedTags: string[]) => {
    setShowRequestSheet(false);
    Alert.alert(
      "Request Sent to Tax Executive",
      "Your feedback has been delivered to your assigned Tax Executive. You will receive an update once the computation is adjusted."
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header */}
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
          <Text style={styles.headerSubtitle}>Tax Computation Review</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 148 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Info Banner */}
        <ComputationInfoBanner />

        {/* Refund / Tax Payable Hero Card */}
        <RefundHeroCard
          isRefund={DEFAULT_COMPUTATION_DATA.isRefund}
          amount={DEFAULT_COMPUTATION_DATA.refundDue || 29585}
        />

        {/* Tax Summary Breakdown Card */}
        <TaxSummaryCard computation={DEFAULT_COMPUTATION_DATA} />

        {/* Return Details Card */}
        <ReturnDetailsCard details={returnDetails} />

        {/* Important Notes Card */}
        <ImportantNotesCard />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowApprovalModal(true)}
          style={styles.approveButton}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
          <Text style={styles.approveButtonText}>Approve & Proceed to Filing</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowRequestSheet(true)}
          style={styles.requestButton}
        >
          <Ionicons name="chatbox-ellipses-outline" size={18} color="#0B1F3A" />
          <Text style={styles.requestButtonText}>Request Changes</Text>
        </TouchableOpacity>

        {/* Security & Encryption Trust Banner */}
        <View style={styles.trustBadge}>
          <Ionicons name="lock-closed-outline" size={13} color="#64748B" />
          <Text style={styles.trustText}>
            100% Secure • Your data is encrypted and protected
          </Text>
        </View>
      </View>

      {/* Confirmation Modal */}
      <ConfirmApprovalModal
        visible={showApprovalModal}
        isLoading={isSubmitting}
        onConfirm={handleApproveAndFile}
        onCancel={() => setShowApprovalModal(false)}
      />

      {/* Request Changes Bottom Sheet */}
      <RequestChangesBottomSheet
        visible={showRequestSheet}
        onSubmit={handleChangesSubmitted}
        onClose={() => setShowRequestSheet(false)}
      />
    </View>
  );
};

export default TaxComputationReviewScreen;
