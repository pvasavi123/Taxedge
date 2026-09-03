import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ActivityIndicator,
  type AlertButton,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, type Href } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { useApplicationStore } from "../../store/applicationStore";

import { ScreenLayout, SCREEN_BOTTOM_PADDING } from "../../components/ScreenLayout";
import { styles } from "../../styles/app/(main)/profile.styles";
 
import { SecondaryButton } from "../../components/SecondaryButton";
import type { IconName } from "../../types/domain";

/**
 * Account hub. Rows either navigate to a screen that exists, open one of the
 * two detail modals below, or - for the parts of the menu that have no screen
 * behind them yet - say so rather than leading somewhere empty.
 */

type RowAction =
  | { kind: "route"; href: any }
  | { kind: "modal"; modal: "personal" | "kyc" }
  | { kind: "soon" };

interface MenuRow {
  label: string;
  icon: IconName;
  tint: string;
  tintBg: string;
  action: RowAction;
}

interface MenuSection {
  title: string;
  rows: MenuRow[];
}

const SECTIONS: MenuSection[] = [
  {
    title: "Account",
    rows: [
      {
        label: "Personal Information",
        icon: "person",
        tint: "#6D28D9",
        tintBg: "#F1ECFE",
        action: { kind: "modal", modal: "personal" },
      },
      {
        label: "KYC Details",
        icon: "card",
        tint: "#2563EB",
        tintBg: "#EAF1FE",
        action: { kind: "modal", modal: "kyc" },
      },
      {
        label: "GST Details",
        icon: "receipt",
        tint: "#7C3AED",
        tintBg: "#F1ECFE",
        action: { kind: "soon" },
      },
      {
        label: "ITR History",
        icon: "reader",
        tint: "#EA580C",
        tintBg: "#FEF0E6",
        action: { kind: "soon" },
      },
      {
        label: "Loan History",
        icon: "business",
        tint: "#475569",
        tintBg: "#EEF2F6",
        action: { kind: "soon" },
      },
    ],
  },
  {
    title: "Services",
    rows: [
      {
        label: "My Applications",
        icon: "folder",
        tint: "#D97706",
        tintBg: "#FDF2E3",
        action: { kind: "route", href: "/(main)/applications" },
      },
      {
        label: "My Documents",
        icon: "document-text",
        tint: "#2563EB",
        tintBg: "#EAF1FE",
        action: { kind: "route", href: "/(main)/documents" },
      },
      {
        label: "Payments & Invoices",
        icon: "card",
        tint: "#0891B2",
        tintBg: "#E5F5F9",
        action: { kind: "route", href: "/(main)/payments" },
      },
      {
        label: "Notifications",
        icon: "notifications",
        tint: "#EA580C",
        tintBg: "#FEF0E6",
        action: { kind: "route", href: "/notifications" },
      },
    ],
  },
  {
    title: "Security",
    rows: [
      {
        label: "Change Password",
        icon: "lock-closed",
        tint: "#DC2626",
        tintBg: "#FDEBEB",
        action: { kind: "soon" },
      },
      {
        label: "Two-Factor Authentication",
        icon: "keypad",
        tint: "#6D28D9",
        tintBg: "#F1ECFE",
        action: { kind: "soon" },
      },
      {
        label: "Login History",
        icon: "time",
        tint: "#475569",
        tintBg: "#EEF2F6",
        action: { kind: "soon" },
      },
      {
        label: "Privacy Settings",
        icon: "shield-half",
        tint: "#D97706",
        tintBg: "#FDF2E3",
        action: { kind: "soon" },
      },
    ],
  },
  {
    title: "Support",
    rows: [
      {
        label: "Customer Support",
        icon: "chatbubbles",
        tint: "#2563EB",
        tintBg: "#EAF1FE",
        action: { kind: "route", href: "/chat/support" },
      },
      {
        label: "Rate TaxEdge",
        icon: "star",
        tint: "#D97706",
        tintBg: "#FDF2E3",
        action: { kind: "soon" },
      },
      {
        label: "Terms & Conditions",
        icon: "document-text",
        tint: "#475569",
        tintBg: "#EEF2F6",
        action: { kind: "soon" },
      },
      {
        label: "Privacy Policy",
        icon: "shield-checkmark",
        tint: "#0891B2",
        tintBg: "#E5F5F9",
        action: { kind: "soon" },
      },
    ],
  },
];

/** ₹18,000 -> ₹18K, so the stat tile never wraps. */
const compactRupees = (value: number): string => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) {
    const thousands = value / 1000;
    return `₹${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
  }
  return `₹${value}`;
};

export default function ProfileScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { customer, logout, setAvatar } = useAuthStore();
  const applications = useApplicationStore((state) => state.applications);

  const [pickingPhoto, setPickingPhoto] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);

  /* ---------- Stats ---------- */
  const activeCount = applications.filter(
    (app) => app.status !== "Completed",
  ).length;
  const completedCount = applications.filter(
    (app) => app.status === "Completed",
  ).length;
  const totalPaid = applications
    .filter((app) => app.paymentStatus === "Paid")
    .reduce((sum, app) => sum + app.paymentAmount, 0);

  /* KYC reads as verified once both identity documents are on file. */
  const allDocuments = applications.flatMap((app) => app.documents);
  const hasUploaded = (keyword: string) =>
    allDocuments.some(
      (doc) =>
        doc.name.toLowerCase().includes(keyword) && doc.status === "Uploaded",
    );
  const kycVerified = hasUploaded("pan") && hasUploaded("aadhaar");

  /* ---------- Profile photo ---------- */
  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permission needed",
        "Allow photo access to choose a profile picture.",
      );
      return;
    }
    setPickingPhoto(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setAvatar(result.assets[0].uri);
      }
    } finally {
      setPickingPhoto(false);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Allow camera access to take a photo.");
      return;
    }
    setPickingPhoto(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setAvatar(result.assets[0].uri);
      }
    } finally {
      setPickingPhoto(false);
    }
  };

  const handleChangePhoto = () => {
    const options: AlertButton[] = [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickFromLibrary },
    ];
    if (customer?.avatarUri) {
      options.push({
        text: "Remove Photo",
        style: "destructive",
        onPress: () => setAvatar(null),
      });
    }
    options.push({ text: "Cancel", style: "cancel" });
    Alert.alert("Profile Photo", "Choose a picture for your profile", options);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out of TaxEdge?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const runAction = (row: MenuRow) => {
    switch (row.action.kind) {
      case "route":
        router.push(row.action.href);
        return;
      case "modal":
        if (row.action.modal === "kyc") setShowKycModal(true);
        else setShowPersonalModal(true);
        return;
      case "soon":
        Alert.alert(row.label, "This section isn't available yet.");
    }
  };

  const infoRow = (label: string, value: string) => (
    <View key={label} style={styles.infoRow}>
      <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );

  return (
    <ScreenLayout title="My Profile">
      <ScrollView
        contentContainerStyle={{ paddingBottom: SCREEN_BOTTOM_PADDING }}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- Hero ---------- */}
        <View style={[styles.hero, { backgroundColor: colors.primaryDark }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleChangePhoto}
            style={styles.avatarWrap}
          >
            <View style={styles.avatarBg}>
              {customer?.avatarUri ? (
                <Image
                  source={{ uri: customer.avatarUri }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person" size={38} color="#FFFFFF" />
              )}

              {pickingPhoto && (
                <View style={styles.avatarLoading}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
              )}
            </View>

            <View style={[styles.editBadge, { backgroundColor: colors.orange }]}>
              <Ionicons name="pencil" size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.heroName}>
            {customer?.name || "Customer Profile"}
          </Text>
          <Text style={styles.heroId}>
            Customer ID: {customer?.customerId || "N/A"}
          </Text>

          <View style={styles.pillRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {customer?.customerType || "Client"}
              </Text>
            </View>
            <View
              style={[
                styles.pill,
                styles.pillOutline,
                { borderColor: kycVerified ? "#7BE0A8" : colors.orange },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: kycVerified ? "#7BE0A8" : colors.orange },
                ]}
              >
                {kycVerified ? "KYC Verified ✓" : "KYC Pending"}
              </Text>
            </View>
          </View>
        </View>

        {/* ---------- Stats ---------- */}
        <View
          style={[
            styles.statsCard,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          {[
            { value: `${activeCount}`, label: "Active Apps", color: colors.primary },
            {
              value: `${completedCount}`,
              label: "Completed",
              color: colors.success,
            },
            {
              value: compactRupees(totalPaid),
              label: "Total Paid",
              color: colors.orange,
            },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCell}>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* ---------- Menu ---------- */}
        <View style={styles.menuArea}>
          {SECTIONS.map((section) => (
            <View key={section.title}>
              <Text
                style={[styles.sectionLabel, { color: colors.textSecondary }]}
              >
                {section.title.toUpperCase()}
              </Text>

              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                  },
                ]}
              >
                {section.rows.map((row, index) => (
                  <TouchableOpacity
                    key={row.label}
                    activeOpacity={0.75}
                    onPress={() => runAction(row)}
                    style={[
                      styles.row,
                      index > 0 && [
                        styles.rowBorderTop,
                        { borderTopColor: colors.border },
                      ],
                    ]}
                  >
                    <View
                      style={[styles.rowIcon, { backgroundColor: row.tintBg }]}
                    >
                      <Ionicons name={row.icon} size={17} color={row.tint} />
                    </View>
                    <Text style={[styles.rowLabel, { color: colors.text }]}>
                      {row.label}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={17}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogout}
            style={[
              styles.logoutBtn,
              {
                borderColor: colors.error,
                backgroundColor: colors.backgroundElement,
              },
            ]}
          >
            <Ionicons name="log-out-outline" size={19} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ---------- Personal information ---------- */}
      <Modal
        visible={showPersonalModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPersonalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Personal Information
            </Text>

            <View style={styles.modalBody}>
              {infoRow("Full Name", customer?.name || "N/A")}
              {infoRow("Mobile", customer?.mobile || "N/A")}
              {infoRow("Email", customer?.email || "N/A")}
              {infoRow("Date of Birth", customer?.dob || "N/A")}
              {infoRow("Customer Type", customer?.customerType || "N/A")}
              {infoRow("Address", customer?.address || "N/A")}
            </View>

            <SecondaryButton
              title="Close"
              onPress={() => setShowPersonalModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* ---------- KYC ---------- */}
      <Modal
        visible={showKycModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowKycModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              KYC Details
            </Text>

            <View style={styles.modalBody}>
              {infoRow(
                "PAN Number",
                customer?.pan
                  ? `${customer.pan.substring(0, 5)}****${customer.pan.substring(9)}`
                  : "N/A",
              )}
              {infoRow(
                "Aadhaar Number",
                customer?.aadhaar
                  ? `**** **** ${customer.aadhaar.substring(8)}`
                  : "N/A",
              )}
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
                  Verification Status
                </Text>
                <View style={styles.statusLabelContainer}>
                  <Ionicons
                    name={kycVerified ? "checkmark-circle" : "time"}
                    size={16}
                    color={kycVerified ? colors.success : colors.orange}
                  />
                  <Text
                    style={[
                      styles.statusLabelText,
                      { color: kycVerified ? colors.success : colors.orange },
                    ]}
                  >
                    {kycVerified ? "VERIFIED ✓" : "PENDING"}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={[styles.modalNote, { color: colors.textSecondary }]}>
              Status reflects the PAN and Aadhaar documents uploaded against
              your applications.
            </Text>

            <SecondaryButton
              title="Close"
              onPress={() => setShowKycModal(false)}
            />
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
}

