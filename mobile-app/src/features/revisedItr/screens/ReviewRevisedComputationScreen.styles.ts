/**
 * Screen: Review Revised Computation (Revised ITR)
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
  badgeWrapper: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: BorderWidth.thin,
    borderColor: "#FED7AA",
    borderRadius: BorderRadius.md,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
  },
  statusBadgeText: {
    fontSize: Typography.fontSize.xs + 1.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#EA580C",
  },
  titleSection: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: Typography.fontSize.lg + 4,
    fontWeight: Typography.fontWeight.extraBold,
    color: "#0B1F3A",
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  pageSubtitle: {
    fontSize: Typography.fontSize.sm + 0.5,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: Spacing.xs,
    lineHeight: 18,
    fontWeight: Typography.fontWeight.regular,
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.thin,
    borderColor: "#DBEAFE",
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
    marginBottom: Spacing.base,
  },
  infoIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.xs + 1.5,
    color: "#475569",
    lineHeight: 16,
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
  proceedButton: {
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
  proceedButtonText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.2,
  },
});
