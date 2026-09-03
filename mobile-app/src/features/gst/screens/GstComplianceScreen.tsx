import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { GstServiceBanner } from "../components/common/GstServiceBanner";
import { GstSelectModal } from "../components/common/GstSelectModal";
import { GstDatePickerModal } from "../components/common/GstDatePickerModal";
import { GstSuccessAnimationScreen } from "../components/common/GstSuccessAnimationScreen";
import { GstReconciliationSection } from "../components/compliance/GstReconciliationSection";
import { GstNoticeResponseSection } from "../components/compliance/GstNoticeResponseSection";
import { GstValidators } from "../utils/gstValidators";
import { styles } from "./GstComplianceScreen.styles";

const FINANCIAL_YEARS = ["2025-26", "2024-25", "2023-24", "2022-23"];
const REQUEST_TYPES = ["Reconciliation Support", "Notice Response"];

export default function GstComplianceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [gstin, setGstin] = useState("29PAVAN1234K1Z5");
  const [financialYear, setFinancialYear] = useState("");
  const [requestType, setRequestType] = useState<"Reconciliation Support" | "Notice Response" | "">("");

  // Conditional Documents & Fields
  const [purchaseDoc, setPurchaseDoc] = useState<{ uri: string; name: string; size: string } | null>(null);
  const [salesDoc, setSalesDoc] = useState<{ uri: string; name: string; size: string } | null>(null);
  const [gstr2bRef, setGstr2bRef] = useState("");
  const [noticeNumber, setNoticeNumber] = useState("");
  const [noticeDoc, setNoticeDoc] = useState<{ uri: string; name: string; size: string } | null>(null);
  const [dueDate, setDueDate] = useState("");
  const [replyDraft, setReplyDraft] = useState("");

  // Modals & UI States
  const [showFyModal, setShowFyModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clearError = (key: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!GstValidators.isValidGstin(gstin)) errs.gstin = "Enter a valid 15-character GSTIN";
    if (!financialYear) errs.financialYear = "Financial year is required.";
    if (!requestType) errs.requestType = "Please select a request type.";

    if (requestType === "Reconciliation Support") {
      if (!purchaseDoc) errs.purchaseDoc = "Please upload the purchase register.";
      if (!salesDoc) errs.salesDoc = "Please upload the sales register.";
      if (!GstValidators.isNotEmpty(gstr2bRef, 3)) errs.gstr2bRef = "GSTR-2B reference or statement is required.";
    } else if (requestType === "Notice Response") {
      if (!GstValidators.isNotEmpty(noticeNumber, 3)) errs.noticeNumber = "Department notice number is required.";
      if (!noticeDoc) errs.noticeDoc = "Please upload the notice document.";
      if (!dueDate) errs.dueDate = "Response due date is required.";
      if (!purchaseDoc) errs.purchaseDoc = "Please upload the purchase register.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Required Fields Missing", "Please complete all required fields highlighted in red.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <GstSuccessAnimationScreen
        title="Request Submitted!"
        subtitle="Your compliance request has been submitted successfully.&#10;&#10;Our team will review your documents and get back to you soon."
      />
    );
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={BrandColors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GST Compliance</Text>
        <View style={styles.placeholderBox} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
      >
        {/* Top Info Banner */}
        <GstServiceBanner
          iconName="document-text"
          text="For reconciling records or responding to a department notice"
        />

        {/* GSTIN Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>GSTIN</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={gstin}
            editable={false}
          />
        </View>

        {/* Period / Financial Year Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Period / Financial Year <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, errors.financialYear && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowFyModal(true)}
          >
            <Text style={[styles.selectText, !financialYear && styles.placeholderText]}>
              {financialYear || "Select Financial Year"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>
          {errors.financialYear ? <Text style={styles.errorText}>{errors.financialYear}</Text> : null}
        </View>

        {/* Type of Request Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Type of Request <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, errors.requestType && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowTypeModal(true)}
          >
            <Text style={[styles.selectText, !requestType && styles.placeholderText]}>
              {requestType || "Select Request Type"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>
          {errors.requestType ? <Text style={styles.errorText}>{errors.requestType}</Text> : null}
        </View>

        {/* CONDITIONAL 1: Reconciliation Support */}
        {requestType === "Reconciliation Support" && (
          <GstReconciliationSection
            purchaseDoc={purchaseDoc}
            onSelectPurchaseDoc={(doc) => {
              setPurchaseDoc(doc);
              clearError("purchaseDoc");
            }}
            purchaseError={errors.purchaseDoc}
            salesDoc={salesDoc}
            onSelectSalesDoc={(doc) => {
              setSalesDoc(doc);
              clearError("salesDoc");
            }}
            salesError={errors.salesDoc}
            gstr2bRef={gstr2bRef}
            onChangeGstr2bRef={(val) => {
              setGstr2bRef(val);
              clearError("gstr2bRef");
            }}
            gstr2bError={errors.gstr2bRef}
          />
        )}

        {/* CONDITIONAL 2: Notice Response */}
        {requestType === "Notice Response" && (
          <GstNoticeResponseSection
            noticeNumber={noticeNumber}
            onChangeNoticeNumber={(val) => {
              setNoticeNumber(val);
              clearError("noticeNumber");
            }}
            noticeNumberError={errors.noticeNumber}
            noticeDoc={noticeDoc}
            onSelectNoticeDoc={(doc) => {
              setNoticeDoc(doc);
              clearError("noticeDoc");
            }}
            noticeDocError={errors.noticeDoc}
            dueDate={dueDate}
            onOpenDatePicker={() => setShowDateModal(true)}
            dueDateError={errors.dueDate}
          />
        )}

        {/* Submit CTA */}
        <TouchableOpacity
          style={styles.actionOrangeBtn}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.actionOrangeBtnText}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Select Modals */}
      <GstSelectModal
        visible={showFyModal}
        title="Select Financial Year"
        options={FINANCIAL_YEARS}
        selectedValue={financialYear}
        onSelect={(v) => {
          setFinancialYear(v);
          clearError("financialYear");
        }}
        onClose={() => setShowFyModal(false)}
      />

      <GstSelectModal
        visible={showTypeModal}
        title="Select Request Type"
        options={REQUEST_TYPES}
        selectedValue={requestType}
        onSelect={(v) => {
          setRequestType(v as any);
          clearError("requestType");
        }}
        onClose={() => setShowTypeModal(false)}
      />

      <GstDatePickerModal
        visible={showDateModal}
        title="Select Response Due Date"
        selectedDate={dueDate}
        onSelectDate={(d) => {
          setDueDate(d);
          clearError("dueDate");
        }}
        onClose={() => setShowDateModal(false)}
      />
    </View>
  );
}
