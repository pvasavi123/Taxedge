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
import { GstSuccessAnimationScreen } from "../components/common/GstSuccessAnimationScreen";
import { styles } from "./GstCertificateScreen.styles";

const CERTIFICATE_REQUEST_TYPES = [
  "Download Existing Certificate",
  "Request Reprint",
];

export default function GstCertificateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const gstin = "29PAVAN1234K1Z5";
  const registeredMobile = "+91 98XXXXXX23";
  const registeredEmail = "pavan@ybl";

  const [requestType, setRequestType] = useState<"Download Existing Certificate" | "Request Reprint" | "">("Download Existing Certificate");
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const getButtonText = () => {
    if (isProcessing) return "Processing...";
    if (requestType === "Request Reprint") return "Request Reprint";
    return "Download Certificate";
  };

  const handleAction = () => {
    if (!requestType) {
      setError("Please select a request type.");
      Alert.alert("Selection Required", "Please choose whether to download existing certificate or request reprint.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 800);
  };

  if (isCompleted) {
    if (requestType === "Download Existing Certificate") {
      return (
        <GstSuccessAnimationScreen
          iconType="certificate"
          title="Certificate Ready!"
          subtitle="Your requested certificate is ready for download."
        />
      );
    }
    return (
      <GstSuccessAnimationScreen
        iconType="reprint"
        title="Reprint Requested!"
        subtitle="Your certificate reprint request has been submitted successfully.&#10;&#10;We will send the reprinted certificate to your registered email."
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
        <Text style={styles.headerTitle}>GST Certificate</Text>
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
          iconName="ribbon"
          text="Retrieve your already-issued certificate"
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

        {/* Registered Mobile / Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Registered Mobile / Email</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactValue}>{registeredMobile}</Text>
            <Text style={styles.contactValue}>{registeredEmail}</Text>
            <Text style={styles.contactSubText}>
              Used only to confirm identity before releasing the download
            </Text>
          </View>
        </View>

        {/* Request Type Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Request Type <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, error && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowTypeModal(true)}
          >
            <Text style={[styles.selectText, !requestType && styles.placeholderText]}>
              {requestType || "Select Request Type"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Illustration Preview Graphic */}
        <View style={styles.illustrationWrap}>
          <View style={styles.docGraphic}>
            <Ionicons name="document-text-outline" size={60} color="#BFDBFE" />
            <View style={styles.sealBadge}>
              <Ionicons name="ribbon" size={20} color="#2563EB" />
            </View>
          </View>
        </View>

        {/* Dynamic Orange CTA Button */}
        <TouchableOpacity
          style={styles.actionOrangeBtn}
          activeOpacity={0.85}
          onPress={handleAction}
          disabled={isProcessing}
        >
          <Text style={styles.actionOrangeBtnText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Request Type Modal */}
      <GstSelectModal
        visible={showTypeModal}
        title="Select Request Type"
        options={CERTIFICATE_REQUEST_TYPES}
        selectedValue={requestType}
        onSelect={(v) => {
          setRequestType(v as any);
          setError("");
        }}
        onClose={() => setShowTypeModal(false)}
      />
    </View>
  );
}
