/**
 * Screen: Return Filed
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
  header: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingVertical: 6,
    backgroundColor: BrandColors.WHITE,
    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    borderWidth: BorderWidth.thin,
    borderColor: "#E5E7EB",
    backgroundColor: BrandColors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  headerTitleGroup: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
    color: "#0B1F3A",
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 38,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
  },
  aadhaarOtpButton: {
    height: 52,
    borderRadius: BorderRadius.base - 2,
    backgroundColor: "#059669",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#059669",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  aadhaarOtpText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  netBankingButton: {
    height: 50,
    borderRadius: BorderRadius.base - 2,
    backgroundColor: BrandColors.WHITE,
    borderWidth: BorderWidth.regular,
    borderColor: "#0B1F3A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: 14,
  },
  netBankingText: {
    color: "#0B1F3A",
    fontSize: Typography.fontSize.base + 0.5,
    fontWeight: Typography.fontWeight.bold,
  },
  reminderBanner: {
    backgroundColor: "#FFF7ED",
    borderRadius: BorderRadius.base - 2,
    borderWidth: BorderWidth.thin,
    borderColor: "#FED7AA",
    padding: 14,
    marginBottom: Spacing.md,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: Spacing.xs,
  },
  reminderTitle: {
    fontSize: Typography.fontSize.base - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_ORANGE_DARK,
  },
  reminderDescription: {
    fontSize: Typography.fontSize.sm,
    color: "#7C2D12",
    lineHeight: 17,
  },
  securityBanner: {
    backgroundColor: "#EFF6FF",
    borderRadius: BorderRadius.md,
    borderWidth: BorderWidth.thin,
    borderColor: "#DBEAFE",
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  securityText: {
    fontSize: Typography.fontSize.sm,
    color: "#1E40AF",
    fontWeight: Typography.fontWeight.medium,
    flex: 1,
  },
});
