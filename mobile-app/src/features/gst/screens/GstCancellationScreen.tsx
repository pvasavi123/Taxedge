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
import { GstCancellationConfirmModal } from "../components/cancellation/GstCancellationConfirmModal";
import { GstSuccessAnimationScreen } from "../components/common/GstSuccessAnimationScreen";
import { GstValidators } from "../utils/gstValidators";
import { styles } from "./GstCancellationScreen.styles";

const CANCELLATION_REASONS = [
  "Business closed",
  "Turnover below threshold",
  "Business transferred",
  "Other",
];

export default function GstCancellationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const gstin = "29PAVAN1234K1Z5";
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [cancellationDate, setCancellationDate] = useState("");
  const [closingStock, setClosingStock] = useState("");
  const [pendingLiabilities, setPendingLiabilities] = useState("");
  const [lastGstr3b, setLastGstr3b] = useState("");
  const [isFinalReturnDeclared, setIsFinalReturnDeclared] = useState(false);

  // Modals & UI States
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

    if (!reason) errs.reason = "Please select a reason for cancellation.";
    if (reason === "Other" && !GstValidators.isNotEmpty(otherReason, 3)) {
      errs.otherReason = "Please specify the cancellation reason.";
    }
    if (!cancellationDate) errs.cancellationDate = "Cancellation date is required.";
    if (!GstValidators.isNotEmpty(closingStock, 3)) {
      errs.closingStock = "Please describe closing stock.";
    }
    if (!GstValidators.isNotEmpty(lastGstr3b, 3)) {
      errs.lastGstr3b = "Latest filed GSTR-3B reference is required.";
    }
    if (!isFinalReturnDeclared) {
      errs.declaration = "Please confirm the final return declaration.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInitialSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Incomplete Details", "Please fill all required fields and check the declaration.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmCancellation = () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <GstSuccessAnimationScreen
        title="Cancellation Request Submitted!"
        subtitle={`Your cancellation request for ${gstin} has been submitted successfully.\n\nOur team will process your request and keep you updated.`}
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
        <Text style={styles.headerTitle}>GST Cancellation</Text>
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
          iconName="ban"
          text="Formally close your existing GST registration"
        />

        {/* GSTIN (Read-Only) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>GSTIN</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={gstin}
            editable={false}
          />
        </View>

        {/* Reason for Cancellation Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Reason for Cancellation <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, errors.reason && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowReasonModal(true)}
          >
            <Text style={[styles.selectText, !reason && styles.placeholderText]}>
              {reason || "Select Reason"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>
          {errors.reason ? <Text style={styles.errorText}>{errors.reason}</Text> : null}
        </View>

        {/* Conditional "Other" input */}
        {reason === "Other" && (
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>If Other, please specify <Text style={styles.star}>*</Text></Text>
            <TextInput
              style={[styles.input, errors.otherReason && styles.inputError]}
              placeholder="Enter cancellation reason"
              placeholderTextColor="#94A3B8"
              value={otherReason}
              onChangeText={(t) => {
                setOtherReason(t);
                clearError("otherReason");
              }}
            />
            {errors.otherReason ? <Text style={styles.errorText}>{errors.otherReason}</Text> : null}
          </View>
        )}

        {/* Date Cancellation Is Sought */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Date Cancellation Is Sought <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, errors.cancellationDate && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowDateModal(true)}
          >
            <Text style={[styles.selectText, !cancellationDate && styles.placeholderText]}>
              {cancellationDate || "Select cancellation date"}
            </Text>
            <Ionicons name="calendar-outline" size={18} color="#083B75" />
          </TouchableOpacity>
          {errors.cancellationDate ? <Text style={styles.errorText}>{errors.cancellationDate}</Text> : null}
        </View>

        {/* Details of Closing Stock */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Details of Closing Stock <Text style={styles.star}>*</Text></Text>
          <TextInput
            style={[styles.textArea, errors.closingStock && styles.inputError]}
            placeholder="Describe closing stock"
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={closingStock}
            onChangeText={(t) => {
              setClosingStock(t);
              clearError("closingStock");
            }}
            maxLength={300}
          />
          <View style={styles.counterRow}>
            {errors.closingStock ? <Text style={styles.errorText}>{errors.closingStock}</Text> : <View />}
            <Text style={styles.charCount}>{closingStock.length}/300</Text>
          </View>
        </View>

        {/* Pending Liabilities (Optional) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Pending Liabilities (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pending tax dues, if any"
            placeholderTextColor="#94A3B8"
            value={pendingLiabilities}
            onChangeText={setPendingLiabilities}
          />
        </View>

        {/* Last GSTR-3B Filed */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Last GSTR-3B Filed <Text style={styles.star}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.lastGstr3b && styles.inputError]}
            placeholder="Enter latest GSTR-3B reference"
            placeholderTextColor="#94A3B8"
            value={lastGstr3b}
            onChangeText={(t) => {
              setLastGstr3b(t);
              clearError("lastGstr3b");
            }}
          />
          {errors.lastGstr3b ? <Text style={styles.errorText}>{errors.lastGstr3b}</Text> : null}
        </View>

        {/* Final Return Declaration Checkbox */}
        <TouchableOpacity
          style={styles.declarationRow}
          activeOpacity={0.8}
          onPress={() => {
            setIsFinalReturnDeclared(!isFinalReturnDeclared);
            clearError("declaration");
          }}
        >
          <View style={[styles.checkbox, isFinalReturnDeclared && styles.checkboxActive]}>
            {isFinalReturnDeclared && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.declarationLabel}>
              Final Return Declaration <Text style={styles.star}>*</Text>
            </Text>
            <Text style={styles.declarationSubText}>
              Confirms this will be the last return filed
            </Text>
          </View>
        </TouchableOpacity>
        {errors.declaration ? <Text style={styles.errorText}>{errors.declaration}</Text> : null}

        {/* Submit CTA */}
        <TouchableOpacity
          style={styles.actionOrangeBtn}
          activeOpacity={0.85}
          onPress={handleInitialSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.actionOrangeBtnText}>Submit Cancellation Request</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <GstCancellationConfirmModal
        visible={showConfirmModal}
        gstin={gstin}
        onConfirm={handleConfirmCancellation}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Reason Modal & Date Picker */}
      <GstSelectModal
        visible={showReasonModal}
        title="Select Reason for Cancellation"
        options={CANCELLATION_REASONS}
        selectedValue={reason}
        onSelect={(v) => {
          setReason(v);
          clearError("reason");
        }}
        onClose={() => setShowReasonModal(false)}
      />

      <GstDatePickerModal
        visible={showDateModal}
        title="Date Cancellation Is Sought"
        selectedDate={cancellationDate}
        onSelectDate={(d) => {
          setCancellationDate(d);
          clearError("cancellationDate");
        }}
        onClose={() => setShowDateModal(false)}
      />
    </View>
  );
}


