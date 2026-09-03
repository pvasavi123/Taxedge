import { BrandColors, Colors } from "../../shared/theme";

/**
 * Common color palette re-exported from shared theme tokens.
 * Guarantees zero color duplication and strict branding consistency.
 */
export { BrandColors, Colors };

export const ThemeColors = {
  primaryNavy: BrandColors.PRIMARY_BLUE_DARK,
  primaryBlue: BrandColors.PRIMARY_BLUE,
  primaryBlueAccent: BrandColors.PRIMARY_BLUE_ACCENT,
  primaryLightBlue: BrandColors.PRIMARY_LIGHT_BLUE,
  accentOrange: BrandColors.PRIMARY_ORANGE,
  accentOrangeDark: BrandColors.PRIMARY_ORANGE_DARK,
  accentLightOrange: BrandColors.PRIMARY_LIGHT_ORANGE,
  background: BrandColors.BACKGROUND,
  cardBackground: BrandColors.CARD,
  cardBorder: BrandColors.CARD_BORDER,
  border: BrandColors.BORDER,
  textPrimary: BrandColors.TEXT_PRIMARY,
  textSecondary: BrandColors.TEXT_SECONDARY,
  textMuted: BrandColors.TEXT_MUTED,
  white: BrandColors.WHITE,
  successGreen: "#16A34A",
  successLightGreen: "#F0FDF4",
  successBorderGreen: "#DCFCE7",
  errorRed: "#DC2626",
  errorLightRed: "#FEE2E2",
};
