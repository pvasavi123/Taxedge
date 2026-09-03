import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { useApplicationStore } from "../../store/applicationStore";
import type { TimelineStep } from "../../types/domain";
import { styles } from "../../styles/app/application/[id].styles";

type DetailTab = "OVERVIEW" | "STATUS" | "DOCUMENTS" | "PAYMENTS";

const TABS: { id: DetailTab; label: string }[] = [
  { id: "OVERVIEW", label: "Overview" },
  { id: "STATUS", label: "Status" },
  { id: "DOCUMENTS", label: "Documents" },
  { id: "PAYMENTS", label: "Payments" },
];

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return "15 Aug 2026";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (months.some((m) => dateStr.includes(m))) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {}
  return dateStr;
}

export default function ApplicationDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const applications = useApplicationStore((state) => state.applications);
  const uploadDocument = useApplicationStore((state) => state.uploadDocument);
  const app = applications.find((a) => a.id === id);

  const [activeTab, setActiveTab] = useState<DetailTab>("OVERVIEW");

  if (!app) {
    return (
      <View style={[styles.container, { backgroundColor: "#0A2346", paddingTop: insets.top + 20 }]}>
        <StatusBar barStyle="light-content" backgroundColor="#0A2346" />
        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}><Ionicons name="chevron-back" size={22} color="#FFF" /></TouchableOpacity>
          <Text style={styles.navTitle}>Not Found</Text>
          <View style={{ width: 38 }} />
        </View>
        <View style={styles.errorContent}>
          <Ionicons name="warning-outline" size={48} color="#EA580C" />
          <Text style={styles.errorText}>Application not found.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.actionBtnFilled}><Text style={styles.actionBtnFilledText}>Return to Applications</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  const applicantName = app.formData?.applicantName || "Akhil Kumar";
  const appliedDate = formatDisplayDate(app.createdAt);
  const assignedCA = app.assignedExecutive || "CA Priya Sharma";
  const expectedDate = "22 Aug 2026";
  const uploadedDocs = app.documents.filter((d) => d.status === "Uploaded").length;
  const totalAmount = app.paymentAmount + Math.round(app.paymentAmount * 0.18);

  const timelineSteps: TimelineStep[] = (app.timeline && app.timeline.length > 0) ? app.timeline : [
    { title: "Application Submitted", description: "Application filed online with documents", status: "completed", date: appliedDate },
    { title: "Document Verification", description: "Review of premises and identity documents", status: "current", date: "16 Aug 2026" },
    { title: "TRN Generation", description: "Temporary Reference Number creation", status: "pending" },
    { title: "GST Certificate Issuance", description: "Final GSTIN approval from Department", status: "pending" },
  ];

  const handleDocumentUpload = async (docName: string) => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        uploadDocument(app.id, docName, res.assets[0].uri);
      }
    } catch {
      uploadDocument(app.id, docName, `file://uploaded/${docName}.pdf`);
    }
  };

  const headerInfo = {
    OVERVIEW: { nav: "Application Details", title: app.serviceName, sub: `${applicantName} • ${appliedDate}` },
    STATUS: { nav: "Application Status", title: "Document Verification", sub: `Assigned CA: ${assignedCA} • Target: ${expectedDate}` },
    DOCUMENTS: { nav: "Required Documents", title: "Document Uploads", sub: `${uploadedDocs} of ${app.documents.length} documents uploaded` },
    PAYMENTS: { nav: "Payment Details", title: "Invoice & Fees", sub: `Total: ₹${totalAmount.toLocaleString()} • Status: ${app.paymentStatus}` },
  }[activeTab];

  const overviewRows = [
    { key: "Customer", val: applicantName },
    { key: "Service", val: app.serviceName },
    { key: "Application ID", val: app.id },
    { key: "Applied Date", val: appliedDate },
    { key: "Assigned CA", val: assignedCA },
    { key: "Expected Completion", val: expectedDate },
  ];

  const paymentRows = [
    { key: "Service Fee", val: `₹${app.paymentAmount.toLocaleString()}` },
    { key: "Government Fees", val: "₹0 (Included)" },
    { key: "GST (18%)", val: `₹${Math.round(app.paymentAmount * 0.18).toLocaleString()}` },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2346" />

      {/* ---------------- ROYAL NAVY HEADER ---------------- */}
      <View style={[styles.navyHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.topNavRow}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>{headerInfo.nav}</Text>
          <View style={{ width: 38 }} />
        </View>

        <View style={{ paddingHorizontal: 2 }}>
          <Text style={styles.appIdLabel}>{`APPLICATION #${app.id}`}</Text>
          <Text style={styles.serviceTitle}>{headerInfo.title}</Text>
          <Text style={styles.serviceSubtitle}>{headerInfo.sub}</Text>
        </View>
      </View>

      {/* ---------------- 4 TABS ROW ---------------- */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity key={tab.id} activeOpacity={0.7} onPress={() => setActiveTab(tab.id)} style={styles.tabItem}>
              <Text style={[styles.tabLabel, { color: isActive ? "#FF5722" : "#0A2346", fontWeight: isActive ? "700" : "600" }]} numberOfLines={1} adjustsFontSizeToFit>
                {tab.label}
              </Text>
              <View style={isActive ? styles.activeTabIndicator : styles.inactiveTabIndicator} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ---------------- SCROLLABLE BODY ---------------- */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]} showsVerticalScrollIndicator={false}>
        {/* TAB 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="information-circle-outline" size={20} color="#083B75" />
              <Text style={styles.cardHeaderTitle}>Application Info</Text>
            </View>
            <View style={{ gap: 10 }}>
              {overviewRows.map((r, i) => (
                <React.Fragment key={r.key}>
                  {i > 0 && <View style={styles.infoDivider} />}
                  <View style={styles.infoRow}><Text style={styles.infoKey}>{r.key}</Text><Text style={styles.infoVal}>{r.val}</Text></View>
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {/* TAB 2: STATUS */}
        {activeTab === "STATUS" && (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="git-branch-outline" size={20} color="#083B75" />
              <Text style={styles.cardHeaderTitle}>Status Timeline</Text>
            </View>
            <View style={{ paddingLeft: 4, paddingTop: 4 }}>
              {timelineSteps.map((step, index) => {
                const isLast = index === timelineSteps.length - 1;
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";
                return (
                  <View key={index} style={{ flexDirection: "row", marginBottom: 6 }}>
                    <View style={{ alignItems: "center", width: 28, marginRight: 10 }}>
                      {isCompleted ? (
                        <View style={styles.completedCircle}><Ionicons name="checkmark" size={12} color="#FFF" /></View>
                      ) : isCurrent ? (
                        <View style={styles.currentCircle}><Ionicons name="play" size={10} color="#FFF" /></View>
                      ) : (
                        <View style={styles.pendingCircle} />
                      )}
                      {!isLast && <View style={[styles.timelineConnectingLine, { backgroundColor: isCompleted ? "#16A34A" : isCurrent ? "#FED7AA" : "#E2E8F0" }]} />}
                    </View>
                    <View style={styles.timelineContentCol}>
                      <View style={styles.timelineStepTopRow}>
                        <Text style={[styles.timelineStepTitle, { color: isCurrent ? "#EA580C" : isCompleted ? "#0F172A" : "#64748B", fontWeight: isCurrent || isCompleted ? "700" : "600" }]}>{step.title}</Text>
                        {step.date && <Text style={styles.timelineStepDate}>{step.date}</Text>}
                      </View>
                      <Text style={styles.timelineStepSub}>{step.description}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === "DOCUMENTS" && (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="folder-open-outline" size={20} color="#083B75" />
              <Text style={styles.cardHeaderTitle}>Required Documents</Text>
            </View>
            <View style={{ gap: 12 }}>
              {app.documents.map((doc, i) => {
                const isUploaded = doc.status === "Uploaded";
                return (
                  <View key={i} style={styles.docItemCard}>
                    <View style={styles.docIconWrap}>
                      <Ionicons name={isUploaded ? "checkmark-circle" : "document-text-outline"} size={24} color={isUploaded ? "#083B75" : "#EA580C"} />
                    </View>
                    <View style={{ flex: 1, paddingRight: 8, justifyContent: "center" }}><Text style={styles.docNameText}>{doc.name}</Text></View>
                    {!isUploaded ? (
                      <TouchableOpacity activeOpacity={0.8} onPress={() => handleDocumentUpload(doc.name)} style={styles.uploadPeachBtn}>
                        <Text style={styles.uploadPeachBtnText}>Upload</Text>
                        <Ionicons name="cloud-upload-outline" size={15} color="#EA580C" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity activeOpacity={0.8} onPress={() => handleDocumentUpload(doc.name)} style={styles.uploadedPill}>
                        <Ionicons name="checkmark-circle" size={14} color="#083B75" />
                        <Text style={styles.uploadedPillText}>Uploaded</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* TAB 4: PAYMENTS */}
        {activeTab === "PAYMENTS" && (
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="card-outline" size={20} color="#083B75" />
              <Text style={styles.cardHeaderTitle}>Payment Summary</Text>
            </View>
            <View style={{ gap: 10 }}>
              {paymentRows.map((r, i) => (
                <React.Fragment key={r.key}>
                  <View style={styles.infoRow}><Text style={styles.infoKey}>{r.key}</Text><Text style={styles.infoVal}>{r.val}</Text></View>
                  <View style={styles.infoDivider} />
                </React.Fragment>
              ))}
              <View style={styles.infoRow}>
                <Text style={[styles.infoKey, { fontWeight: "700", color: "#0A2346" }]}>Total Amount</Text>
                <Text style={[styles.infoVal, { color: "#EA580C", fontSize: 16 }]}>₹{totalAmount.toLocaleString()}</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Payment Status</Text>
                <View style={[styles.statusPillSmall, { backgroundColor: app.paymentStatus === "Paid" ? "#E0F2FE" : "#FFF1E8" }]}>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: app.paymentStatus === "Paid" ? "#083B75" : "#EA580C" }}>{app.paymentStatus}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ---------------- FIXED BOTTOM ACTION BUTTON ---------------- */}
      <View style={[styles.bottomActionBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/chat/support")} style={styles.actionBtnFilled}>
          <Ionicons name="headset-outline" size={18} color="#FFFFFF" />
          <Text style={styles.actionBtnFilledText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


