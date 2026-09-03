/**
 * Screen: GST Amendment
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
  root: {
    flex: 1,
    backgroundColor: BrandColors.WHITE,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingBottom: 12,
    backgroundColor: BrandColors.WHITE,
  },
  backButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  placeholderBox: {
    width: 38,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    paddingBottom: 240,
    gap: 14,
    flexGrow: 1,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.semiBold,
    color: BrandColors.TEXT_PRIMARY,
  },
  star: {
    color: "#EF4444",
  },
  input: {
    height: 48,
    backgroundColor: BrandColors.BACKGROUND,
    borderRadius: BorderRadius.md,
    borderWidth: BorderWidth.thin,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: Typography.fontSize.base,
    color: BrandColors.TEXT_PRIMARY,
  },
  readOnlyInput: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontWeight: Typography.fontWeight.semiBold,
  },
  textArea: {
    minHeight: 88,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: BorderWidth.thin,
    borderColor: "#E2E8F0",
    padding: 12,
    fontSize: Typography.fontSize.sm + 1.5,
    color: BrandColors.TEXT_PRIMARY,
    textAlignVertical: "top",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  charCount: {
    fontSize: Typography.fontSize.xs + 1,
    color: "#94A3B8",
  },
  selectBox: {
    height: 48,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: BorderWidth.thin,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    color: BrandColors.TEXT_PRIMARY,
  },
  placeholderText: {
    color: "#94A3B8",
    fontWeight: Typography.fontWeight.regular,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: Typography.fontSize.xs + 1.5,
    color: "#DC2626",
    fontWeight: Typography.fontWeight.medium,
  },
  actionOrangeBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: BrandColors.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    marginTop: Spacing.sm,
  },
  actionOrangeBtnText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.WHITE,
  },
});
