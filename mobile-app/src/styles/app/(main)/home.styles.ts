/**
 * Screen: Home Dashboard
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  BrandColors,
  BorderRadius,
  Spacing,
  Typography,
} from "../../../shared/theme";

const { width } = Dimensions.get("window");
const H_PADDING = Spacing.base;
const BANNER_HEIGHT = 168;
const CARD_WIDTH = width - H_PADDING * 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Header */
  heroHeader: {
    paddingHorizontal: H_PADDING,
    paddingBottom: Spacing.md,
  },
  topHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuBtn: {
    paddingRight: Spacing.md,
  },
  brandContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.sm,
    backgroundColor: BrandColors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 28,
    height: 28,
  },
  brandText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.lg + 1,
    fontWeight: Typography.fontWeight.extraBold,
    letterSpacing: 1.2,
  },
  brandSubText: {
    color: "#B9CBE4",
    fontSize: Typography.fontSize.xs - 2,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 2,
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconBtn: {
    padding: 2,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#052750",
  },
  badgeText: {
    color: BrandColors.WHITE,
    fontSize: 10,
    fontWeight: Typography.fontWeight.extraBold,
  },

  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.md,
  },
  greetingContainer: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  welcomeText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.xxl + 1,
    fontWeight: Typography.fontWeight.extraBold,
  },
  welcomeSubText: {
    color: "#CBD9EA",
    fontSize: Typography.fontSize.base,
    marginTop: 5,
    fontWeight: Typography.fontWeight.medium,
  },

  /* Scroll body */
  scrollContent: {
    padding: H_PADDING,
    gap: Spacing.base,
  },

  /* Banner */
  loansBanner: {
    height: BANNER_HEIGHT,
    borderRadius: BorderRadius.base,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  bannerLeft: {
    flex: 1.4,
  },
  bannerTitle: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.extraBold,
    letterSpacing: 1,
  },
  bannerDesc: {
    color: "#C9D8EC",
    fontSize: Typography.fontSize.sm + 1.5,
    marginTop: 5,
    fontWeight: Typography.fontWeight.semiBold,
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    alignSelf: "flex-start",
    marginTop: Spacing.base,
  },
  exploreText: {
    color: BrandColors.WHITE,
    fontWeight: Typography.fontWeight.extraBold,
    fontSize: Typography.fontSize.sm + 1,
  },
  dotGrid: {
    position: "absolute",
    right: 118,
    top: 26,
    width: 34,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    opacity: 0.55,
  },
  decorDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
  },
  bannerRight: {
    flex: 0.9,
    alignItems: "flex-end",
  },
  bannerIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(249,115,22,0.16)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* Generic card */
  card: {
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    paddingVertical: Spacing.base,
  },
  cardPadded: {
    paddingHorizontal: Spacing.base,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
  },
  viewAllText: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
  },

  /* Quick links */
  bannerPage: {
    width: CARD_WIDTH,
  },
  quickRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  quickTile: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 1,
  },
  circleIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  circleLabel: {
    fontSize: 11.5,
    fontWeight: Typography.fontWeight.bold,
    textAlign: "center",
    marginTop: 9,
    lineHeight: 14,
  },

  /* All services sheet */
  sheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(5,39,80,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    height: "92%",
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.base,
    paddingTop: 18,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.base - 2,
  },
  sheetTitle: {
    fontSize: Typography.fontSize.xxl - 1,
    fontWeight: Typography.fontWeight.extraBold,
  },
  sheetDone: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  sheetSearch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.base - 2,
  },
  sheetSearchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    padding: 0,
  },
  sheetScrollContent: {
    paddingTop: 6,
    paddingBottom: Spacing.md,
  },

  /* Catalogue groups */
  catHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    marginBottom: 10,
  },
  catIcon: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  catTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 52,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  serviceRowText: {
    fontSize: Typography.fontSize.md - 0.5,
    fontWeight: Typography.fontWeight.medium,
  },
  sheetEmpty: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 56,
  },
  sheetEmptyText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  pageDot: {
    borderRadius: 4,
  },

  /* List rows */
  emptyText: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.medium,
    textAlign: "center",
    paddingVertical: Spacing.md,
  },

  /* Stats grid */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statsCard: {
    width: (CARD_WIDTH - 12) / 2,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    padding: 14,
  },
  statsTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  statsLabel: {
    flex: 1,
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.semiBold,
    lineHeight: 16,
  },
  statsIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  statsNumber: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.extraBold,
    marginTop: Spacing.md,
  },

  /* Upcoming deadlines */
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  deadlineRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  deadlineTag: {
    minWidth: 44,
    paddingHorizontal: Spacing.sm,
    height: 26,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  deadlineTagText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.extraBold,
  },
  deadlineText: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  deadlineDate: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: 3,
  },
  duePill: {
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  duePillText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.extraBold,
  },

  /* Recent application cards */
  appCard: {
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    padding: Spacing.base,
  },
  appCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  appId: {
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.3,
  },
  statusPill: {
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  statusPillText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  appName: {
    fontSize: Typography.fontSize.lg + 1,
    fontWeight: Typography.fontWeight.extraBold,
    marginTop: 10,
  },
  appCardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  appDate: {
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  /* Section headers */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
  },

  /* Need help */
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#0B5B41",
    borderRadius: 18,
    padding: Spacing.base,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  helpIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
  },
  helpDesc: {
    color: "#C7E5D8",
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
    marginTop: 3,
  },
  helpBtn: {
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
  },
  helpBtnText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.sm + 1.5,
    fontWeight: Typography.fontWeight.extraBold,
  },
});
