/**
 * Screen: Document Upload View
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet, Platform } from "react-native";
import {
  BrandColors,
  BorderRadius,
  BorderWidth,
  Spacing,
  Typography,
} from "../../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.base,
  },
  /* Top Dashed Dropzone */
  dropzone: {
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.lg - 2,
    borderWidth: BorderWidth.regular,
    borderColor: BrandColors.PRIMARY_ORANGE,
    borderStyle: "dashed",
    paddingVertical: 22,
    paddingHorizontal: Spacing.base,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    ...Platform.select({
      web: { cursor: "pointer" as any },
    }),
  },
  cloudBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_ORANGE,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  dropzoneTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: -0.2,
  },
  dropzoneSub: {
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
  },
  dropzoneNote: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.regular,
    color: BrandColors.TEXT_MUTED,
  },

  /* Action Buttons Row */
  actionButtonsRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  actionPillBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    paddingVertical: 10,
    paddingHorizontal: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  actionPillText: {
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE,
  },

  /* Section Title */
  sectionHeader: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: -0.2,
  },
  sectionSub: {
    fontSize: Typography.fontSize.xs,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
  },

  /* Empty State */
  emptyContainer: {
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.base,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    borderStyle: "dashed",
    paddingVertical: 28,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  emptyIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.md - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: Typography.fontSize.xs,
    color: BrandColors.TEXT_SECONDARY,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 17,
  },

  /* Document Cards List */
  docList: {
    gap: 12,
  },
  docCard: {
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.base,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    padding: 14,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  docCardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileIconBadge: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  docFileName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE,
    marginBottom: 3,
  },
  docMeta: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.TEXT_SECONDARY,
  },
  statusWrap: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteIconBtn: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.sm,
    backgroundColor: "#FFF1E6",
    borderWidth: 1,
    borderColor: "#FED7AA",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Status Badges */
  orangeBadge: {
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  orangeBadgeText: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_ORANGE_DARK,
  },
  greenBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  greenBadgeText: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#15803D",
  },
  redBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  redBadgeText: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#DC2626",
  },
  uploadMiniBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF1E6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  uploadMiniBtnText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_ORANGE_DARK,
  },

  /* Progress Bar */
  progressBarTrack: {
    height: 4,
    backgroundColor: "#EDF2F7",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 10,
    width: "78%",
    alignSelf: "flex-start",
    marginLeft: 54, // aligns with doc info
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: 2,
  },

  /* Rejected Notice & Action */
  rejectedContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#FEE2E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rejectedReasonText: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.medium,
    color: "#DC2626",
    flex: 1,
    paddingRight: 8,
  },
  reuploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  reuploadBtnText: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.WHITE,
  },

  /* Notice Callout Banner */
  noticeBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FFF7ED",
    borderRadius: BorderRadius.base - 2,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    padding: 12,
  },
  noticeIconWrap: {
    marginTop: 1,
  },
  noticeText: {
    flex: 1,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: "#9A3412",
    lineHeight: 17,
  },

  /* Bottom Primary Orange Button */
  primaryContinueBtn: {
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: BorderRadius.base - 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_ORANGE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  primaryContinueBtnText: {
    fontSize: Typography.fontSize.md + 0.5,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.WHITE,
    letterSpacing: -0.2,
  },
});
