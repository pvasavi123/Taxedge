import { StyleSheet, Platform } from "react-native";
import { BrandColors, BorderRadius, Typography } from "../../shared/theme";

export const buttonStyles = StyleSheet.create({
  primaryOrange: {
    height: 52,
    borderRadius: BorderRadius.base,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
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
  primaryOrangeText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.2,
  },
  secondaryOutlined: {
    height: 50,
    borderRadius: BorderRadius.base,
    backgroundColor: BrandColors.WHITE,
    borderWidth: 1.5,
    borderColor: BrandColors.PRIMARY_BLUE_DARK,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  secondaryOutlinedText: {
    color: BrandColors.PRIMARY_BLUE_DARK,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  orangeOutlined: {
    height: 52,
    borderRadius: BorderRadius.base,
    backgroundColor: BrandColors.WHITE,
    borderWidth: 1.5,
    borderColor: "#FED7AA",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  orangeOutlinedText: {
    color: BrandColors.PRIMARY_ORANGE_DARK,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  disabledButton: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButtonText: {
    color: "#94A3B8",
  },
  iconBoxButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    backgroundColor: BrandColors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
});
