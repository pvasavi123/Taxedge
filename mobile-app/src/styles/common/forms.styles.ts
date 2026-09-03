import { StyleSheet } from "react-native";
import { BrandColors, Spacing, Typography } from "../../shared/theme";

export const formStyles = StyleSheet.create({
  formGroup: {
    marginBottom: Spacing.base - 2,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE_DARK,
    marginBottom: 6,
  },
  requiredAsterisk: {
    color: "#DC2626",
  },
  helperText: {
    fontSize: Typography.fontSize.xs,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 4,
  },
  errorText: {
    fontSize: Typography.fontSize.xs + 0.5,
    color: "#DC2626",
    marginTop: 4,
    fontWeight: Typography.fontWeight.medium,
  },
  characterCounter: {
    fontSize: Typography.fontSize.xs,
    color: BrandColors.TEXT_MUTED,
  },
});
