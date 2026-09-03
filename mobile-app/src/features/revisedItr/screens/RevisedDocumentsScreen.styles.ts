/**
 * Screen: Revised Documents (Revised ITR)
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
    flex: 1,
    backgroundColor: BrandColors.BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  titleSection: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: Typography.fontSize.lg + 4,
    fontWeight: Typography.fontWeight.extraBold,
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  pageSubtitle: {
    fontSize: Typography.fontSize.sm + 0.5,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: Spacing.xs,
    lineHeight: 18,
    fontWeight: Typography.fontWeight.regular,
  },
  progressContainer: {
    marginBottom: 14,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterText: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
    color: "#0B1F3A",
  },
  inProgressBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: BorderWidth.thin,
    borderColor: "#FED7AA",
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 3.5,
  },
  inProgressText: {
    fontSize: Typography.fontSize.xs + 1.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#EA580C",
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    marginTop: Spacing.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: 3,
  },
  docCard: {
    backgroundColor: BrandColors.WHITE,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: BorderWidth.thin,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  docTextGroup: {
    flex: 1,
    marginRight: 10,
  },
  docTitle: {
    fontSize: Typography.fontSize.base - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#0B1F3A",
    lineHeight: 18,
  },
  docSubtitle: {
    fontSize: Typography.fontSize.xs + 1.5,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 3,
    fontWeight: Typography.fontWeight.regular,
  },
  uploadButton: {
    borderWidth: 1.2,
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.sm + 2,
    paddingHorizontal: Spacing.base,
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonText: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
    color: "#EA580C",
  },
  uploadedBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1.2,
    borderColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: BorderRadius.sm + 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  uploadedText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: "#EA580C",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.thin,
    borderColor: "#DBEAFE",
    padding: Spacing.base,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: Spacing.base,
  },
  infoIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoTitle: {
    fontSize: Typography.fontSize.base - 1,
    fontWeight: Typography.fontWeight.bold,
    color: "#0B1F3A",
  },
  infoDescription: {
    fontSize: Typography.fontSize.xs + 1.5,
    color: "#475569",
    lineHeight: 16.5,
    marginTop: 3,
    fontWeight: Typography.fontWeight.regular,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BrandColors.WHITE,
    paddingHorizontal: Spacing.base,
    paddingTop: 10,
    borderTopWidth: BorderWidth.thin,
    borderTopColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  continueButton: {
    height: 52,
    borderRadius: BorderRadius.base,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_ORANGE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  continueButtonText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.2,
  },
});
