import { StyleSheet, Platform } from "react-native";
import { BrandColors, Spacing } from "../../shared/theme";

export const layoutStyles = StyleSheet.create({
  safeAreaScreen: {
    flex: 1,
    backgroundColor: BrandColors.BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  bottomBarSticky: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BrandColors.WHITE,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE_DARK,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  rowCentered: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexOne: {
    flex: 1,
  },
  gapSmall: {
    gap: Spacing.sm,
  },
  gapMedium: {
    gap: Spacing.md,
  },
  gapBase: {
    gap: Spacing.base,
  },
});
