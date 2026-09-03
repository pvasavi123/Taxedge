/**
 * Screen: Passcode
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
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  backBtn: {
    position: "absolute",
    left: 20,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.base - 2,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    backgroundColor: BrandColors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  wrapper: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xl + 6,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  sub: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.TEXT_SECONDARY,
    textAlign: "center",
    lineHeight: 20,
  },
  phoneHighlight: {
    color: BrandColors.PRIMARY_BLUE,
    fontWeight: Typography.fontWeight.bold,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  dotsTouchable: {
    width: "100%",
    alignItems: "center",
    marginVertical: 18,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
  },
  dotBox: {
    width: 46,
    height: 56,
    borderRadius: BorderRadius.base - 2,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  innerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: BrandColors.WHITE,
  },
  cursor: {
    width: 2,
    height: 22,
    backgroundColor: BrandColors.PRIMARY_ORANGE_DARK,
    borderRadius: 1,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  errorText: {
    fontSize: Typography.fontSize.sm + 1,
    color: "#DC2626",
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: "center",
  },
  loginBtn: {
    height: 52,
    borderRadius: BorderRadius.base - 2,
    marginTop: 8,
  },
  switchBtn: {
    marginTop: Spacing.lg,
    paddingVertical: 6,
    alignItems: "center",
  },
  switchText: {
    fontSize: Typography.fontSize.sm + 1.5,
    color: BrandColors.PRIMARY_ORANGE_DARK,
    fontWeight: Typography.fontWeight.semiBold,
  },
});
