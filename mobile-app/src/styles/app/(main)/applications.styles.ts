/**
 * Screen: Applications Center
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet } from "react-native";
import { BrandColors } from "../../../shared/theme";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  navyHeader: { backgroundColor: "#0A2346", paddingHorizontal: 16, paddingBottom: 0, zIndex: 10 },
  headerTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, paddingHorizontal: 4 },
  headerTitleWrap: { flex: 1, paddingRight: 12 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.4 },
  headerSubtitle: { fontSize: 13.5, fontWeight: "400", color: "rgba(255, 255, 255, 0.75)", marginTop: 4 },
  bellButton: { width: 38, height: 38, justifyContent: "center", alignItems: "center", position: "relative" },
  bellDotBadge: { position: "absolute", top: 5, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF5722", borderWidth: 1.5, borderColor: "#0A2346" },
  categoryCardWrapper: { backgroundColor: "#FFFFFF", borderRadius: 18, paddingVertical: 10, paddingHorizontal: 8, marginBottom: -36, zIndex: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 6 },
  categoryTabsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" },
  categoryTabItem: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 2 },
  categoryIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 2 },
  activeCategoryIconWrap: { backgroundColor: "#FFF2EA" },
  categoryTabLabel: { fontSize: 11, textAlign: "center", letterSpacing: -0.2 },
  activeTabIndicator: { height: 2.5, width: 22, backgroundColor: "#FF5722", borderRadius: 2, marginTop: 4 },
  inactiveTabIndicator: { height: 2.5, width: 22, backgroundColor: "transparent", marginTop: 4 },
  scrollContent: { paddingTop: 52, paddingHorizontal: 16 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  overviewCard: { flexDirection: "row", borderRadius: 16, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 4, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  overviewCol: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 4, borderRadius: 10 },
  activeOverviewCol: { backgroundColor: "#FFF7ED" },
  activeOverviewIndicator: { height: 2, width: 18, backgroundColor: "#FF5722", borderRadius: 1, marginTop: 3 },
  inactiveOverviewIndicator: { height: 2, width: 18, backgroundColor: "transparent", marginTop: 3 },
  overviewVal: { fontSize: 18, fontWeight: "800", marginTop: 2, marginBottom: 2, letterSpacing: -0.3 },
  overviewSub: { fontSize: 11, textAlign: "center", marginTop: 2, lineHeight: 14, fontWeight: "500" },
  overviewDivider: { width: 1, height: 30, alignSelf: "center" },
  recentHeaderRow: { marginBottom: 12 },
  appCard: { flexDirection: "row", borderRadius: 18, borderWidth: 1, padding: 14, marginBottom: 12, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  avatarBox: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 12 },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  appIdText: { fontSize: 13, fontWeight: "700" },
  cardBadgeWithArrow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4.5, borderRadius: 14 },
  statusBadgeText: { fontSize: 11.5, fontWeight: "600" },
  cardChevron: { marginLeft: 2 },
  serviceNameText: { fontSize: 15.5, fontWeight: "700", marginTop: 2, marginBottom: 4, letterSpacing: -0.2 },
  cardBottomRow: { flexDirection: "row", alignItems: "center" },
  dateWrap: { flexDirection: "row", alignItems: "center", gap: 4 },
  dateText: { fontSize: 12.5, color: "#64748B", fontWeight: "500" },
  emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 48, paddingHorizontal: 20 },
  emptyText: { fontSize: 15, fontWeight: "600", textAlign: "center" },
});
