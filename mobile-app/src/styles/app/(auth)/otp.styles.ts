/**
 * Screen: OTP Verification
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet, Platform } from "react-native";
import {
  BrandColors,
  BorderRadius,
  Spacing,
  Typography,
} from "../../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.xl,
  },
  backBtnAbsolute: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.base - 2,
    borderWidth: 1,
    borderColor: "#E4E9F0",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: Spacing.xl,
    backgroundColor: BrandColors.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  headerSection: {
    alignItems: "center",
    marginBottom: Spacing.xl + 4,
  },
  title: {
    fontSize: Typography.fontSize.hero + 2,
    fontWeight: Typography.fontWeight.extraBold,
    letterSpacing: 0.2,
  },
  subTitle: {
    fontSize: Typography.fontSize.md,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 21,
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: "#EDF1F6",
    backgroundColor: BrandColors.WHITE,
    paddingHorizontal: 22,
    paddingVertical: 26,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  otpTouchable: {
    width: "100%",
  },
  otpGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
    width: "100%",
  },
  otpBox: {
    width: 46,
    height: 56,
    borderRadius: BorderRadius.base - 2,
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxText: {
    fontSize: Typography.fontSize.lg + 4,
    fontWeight: Typography.fontWeight.bold,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    marginTop: 4,
    fontWeight: Typography.fontWeight.medium,
  },
  verifyBtn: {
    marginTop: 4,
    height: 58,
    borderRadius: BorderRadius.base - 2,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_ORANGE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  resendContainer: {
    marginTop: 22,
    alignItems: "center",
  },
  resendText: {
    fontSize: Typography.fontSize.md - 0.5,
    fontWeight: Typography.fontWeight.medium,
  },
  resendLink: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
});
