import { StyleSheet, Platform } from "react-native";
import { BrandColors, BorderRadius, Spacing, Typography } from "../../shared/theme";

export const inputStyles = StyleSheet.create({
  textInput: {
    height: 48,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: Spacing.base - 2,
    fontSize: Typography.fontSize.base,
    color: BrandColors.PRIMARY_BLUE_DARK,
    fontWeight: Typography.fontWeight.semiBold,
  },
  textInputFocused: {
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: "#FFFFFF",
  },
  textInputError: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  inputWithIconRow: {
    height: 48,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: Spacing.base - 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textareaInput: {
    height: 100,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    padding: Spacing.md,
    textAlignVertical: "top",
    fontSize: Typography.fontSize.sm + 1,
    color: BrandColors.PRIMARY_BLUE_DARK,
    fontWeight: Typography.fontWeight.medium,
  },
  dropdownSelector: {
    height: 48,
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: Spacing.base - 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownMenu: {
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    marginTop: 6,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE_DARK,
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
});
