import { StyleSheet } from "react-native";
import { BrandColors, BorderRadius, Typography } from "../../shared/theme";

export const badgeStyles = StyleSheet.create({
  pillBase: {
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  greenSuccess: {
    backgroundColor: "#DCFCE7",
  },
  greenSuccessText: {
    fontSize: Typography.fontSize.xs + 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#16A34A",
  },
  orangeWarning: {
    backgroundColor: "#FFEDD5",
  },
  orangeWarningText: {
    fontSize: Typography.fontSize.xs + 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_ORANGE_DARK,
  },
  blueInfo: {
    backgroundColor: "#DBEAFE",
  },
  blueInfoText: {
    fontSize: Typography.fontSize.xs + 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#1D4ED8",
  },
  neutralGray: {
    backgroundColor: "#F1F5F9",
  },
  neutralGrayText: {
    fontSize: Typography.fontSize.xs + 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.TEXT_SECONDARY,
  },
  outlineOrange: {
    borderWidth: 1,
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: "transparent",
  },
  outlineOrangeText: {
    fontSize: Typography.fontSize.xs + 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_ORANGE,
  },
});
