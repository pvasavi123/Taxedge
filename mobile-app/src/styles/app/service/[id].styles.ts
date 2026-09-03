/**
 * Screen: Service Detail
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
  },
  scrollContent: {
    padding: Spacing.base,
    gap: Spacing.base,
    paddingBottom: 90, // space for sticky button
  },
  detailHero: {
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.regular,
    padding: Spacing.lg,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  heroTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  heroCategory: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.extraBold,
    textTransform: "uppercase",
    marginTop: 2,
  },
  heroDesc: {
    fontSize: Typography.fontSize.sm + 1,
    lineHeight: 20,
    marginTop: Spacing.md,
    fontWeight: Typography.fontWeight.medium,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: BorderWidth.regular,
    marginTop: Spacing.sm,
  },
  tabItem: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: Typography.fontSize.base,
  },
  card: {
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.regular,
    padding: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  cardSectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 6,
  },
  cardSectionSub: {
    fontSize: Typography.fontSize.sm,
    lineHeight: 18,
    marginBottom: Spacing.base,
  },
  checklist: {
    gap: 10,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checklistText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
  overviewContentText: {
    fontSize: Typography.fontSize.sm + 1,
    lineHeight: 20,
    fontWeight: Typography.fontWeight.medium,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderTopWidth: BorderWidth.regular,
  },
  formWizardHeader: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
  },
  backButton: {
    padding: 4,
  },
  formWizardTitle: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.base,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#00000008",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    width: "50%", // Step 1 of 2 completed visual style
  },
  formSectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  formSectionSub: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.lg,
  },
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    marginTop: Spacing.md,
  },
});
