import { Platform } from "react-native";

export const BrandColors = {
  PRIMARY_BLUE: "#083B75",
  PRIMARY_BLUE_DARK: "#06152D",
  PRIMARY_BLUE_ACCENT: "#0B5ED7",
  PRIMARY_LIGHT_BLUE: "#EAF1FE",
  PRIMARY_ORANGE: "#FF7A00",
  PRIMARY_ORANGE_DARK: "#EA580C",
  PRIMARY_LIGHT_ORANGE: "#FEF0E6",
  BACKGROUND: "#F8FAFC",
  CARD: "#FFFFFF",
  CARD_BORDER: "#F1F5F9",
  TEXT_PRIMARY: "#0F172A",
  TEXT_SECONDARY: "#64748B",
  TEXT_MUTED: "#94A3B8",
  BORDER: "#E2E8F0",
  CHEVRON_BLUE: "#083B75",
  WHITE: "#FFFFFF",
};

export const Colors = {
  primary: BrandColors.PRIMARY_BLUE_ACCENT,
  primaryDark: BrandColors.PRIMARY_BLUE,
  primaryNavy: BrandColors.PRIMARY_BLUE_DARK,
  primaryLight: BrandColors.PRIMARY_LIGHT_BLUE,
  accent: BrandColors.PRIMARY_ORANGE,
  accentLight: BrandColors.PRIMARY_LIGHT_ORANGE,
  orange: BrandColors.PRIMARY_ORANGE,
  orangeLight: BrandColors.PRIMARY_LIGHT_ORANGE,
  success: "#059669",
  successLight: "#E6F5F0",
  warning: BrandColors.PRIMARY_ORANGE,
  warningLight: BrandColors.PRIMARY_LIGHT_ORANGE,
  error: "#DC2626",
  errorLight: "#FDEBEB",
  info: BrandColors.PRIMARY_BLUE_ACCENT,
  infoLight: BrandColors.PRIMARY_LIGHT_BLUE,
  background: BrandColors.BACKGROUND,
  card: BrandColors.CARD,
  cardBorder: BrandColors.CARD_BORDER,
  text: BrandColors.TEXT_PRIMARY,
  textSecondary: BrandColors.TEXT_SECONDARY,
  textMuted: BrandColors.TEXT_MUTED,
  border: BrandColors.BORDER,
  iconBgLight: BrandColors.PRIMARY_LIGHT_BLUE,
  ...BrandColors,
};

export const Typography = {
  fontSize: {
    xs: 11,
    sm: 12,
    base: 14,
    md: 15,
    lg: 16,
    xl: 18,
    xxl: 22,
    hero: 26,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
    extraBold: "800" as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  full: 9999,
};

export const BorderWidth = {
  hairline: 0.5,
  thin: 1,
  base: 1.4,
  regular: 1.5,
  medium: 1.8,
  thick: 2,
};

export const Shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: "#083B75",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: "#083B75",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: "#083B75",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
};
