/**
 * Screen: Register
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    borderWidth: 1.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BrandColors.WHITE,
    marginBottom: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE_DARK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  header: {
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize.xl + 6,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    marginTop: 4,
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 18,
  },
  avatarWrap: {
    position: "relative",
  },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: "#10B981",
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#065F46",
    borderWidth: 2,
    borderColor: BrandColors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    gap: 4,
  },
  fieldContainer: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.sm,
  },
  inputBox: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: BorderRadius.base - 2,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    height: "100%",
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    marginTop: 4,
    fontWeight: Typography.fontWeight.medium,
  },
  submitBtn: {
    marginTop: Spacing.md,
  },
});
