import { StyleSheet } from "react-native";
import { BrandColors, Typography } from "../../shared/theme";

export const typographyStyles = StyleSheet.create({
  heroHeading: {
    fontSize: Typography.fontSize.hero,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE_DARK,
    letterSpacing: -0.4,
  },
  sectionHeading: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE_DARK,
    letterSpacing: -0.3,
  },
  pageTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE_DARK,
    letterSpacing: -0.2,
  },
  cardTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE_DARK,
    lineHeight: 20,
  },
  bodyText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.regular,
    color: BrandColors.TEXT_PRIMARY,
    lineHeight: 20,
  },
  supportingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.regular,
    color: BrandColors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  captionText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.TEXT_MUTED,
    lineHeight: 14,
  },
  labelBold: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE_DARK,
  },
  accentOrangeText: {
    color: BrandColors.PRIMARY_ORANGE,
  },
  successGreenText: {
    color: "#16A34A",
  },
});
