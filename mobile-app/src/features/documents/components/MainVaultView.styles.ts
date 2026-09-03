/**
 * Screen: Main Vault View
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
    width: "100%",
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  headerTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: Typography.fontSize.hero,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: Typography.fontSize.sm + 1.5,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    height: 48,
    paddingHorizontal: Spacing.base - 2,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.md - 0.5,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.PRIMARY_BLUE,
    paddingVertical: 0,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: BrandColors.BORDER,
    marginHorizontal: Spacing.sm,
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F6FF",
    borderRadius: BorderRadius.base - 2,
    borderWidth: 1,
    borderColor: "rgba(8,59,117,0.1)",
    paddingVertical: 10,
    paddingHorizontal: Spacing.base - 2,
    gap: 10,
  },
  securityIconBox: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm + 2,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  securityText: {
    flex: 1,
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.PRIMARY_BLUE,
    lineHeight: 18,
  },
  boldOrange: {
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_ORANGE_DARK,
  },
  storageCard: {
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.base,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    padding: Spacing.base,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  storageTitle: {
    fontSize: Typography.fontSize.md - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE,
  },
  storageNumbers: {
    fontSize: Typography.fontSize.sm + 1.5,
  },
  boldNavy: {
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE,
  },
  subText: {
    fontWeight: Typography.fontWeight.semiBold,
    color: BrandColors.TEXT_SECONDARY,
  },
  track: {
    height: 8,
    backgroundColor: "#EDF2F7",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 2,
  },
  trackFill: {
    width: "4.68%",
    minWidth: 18,
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: 4,
  },
  orangeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
  },
  usedStat: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: BrandColors.PRIMARY_ORANGE_DARK,
  },
  availStat: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.TEXT_SECONDARY,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.extraBold,
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: -0.3,
  },
  categoriesCountBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  categoriesCountText: {
    fontSize: Typography.fontSize.sm - 0.5,
    fontWeight: Typography.fontWeight.bold,
    color: "#1D4ED8",
  },
  cardsList: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BrandColors.WHITE,
    borderRadius: BorderRadius.base,
    borderWidth: 1.2,
    borderColor: BrandColors.BORDER,
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    ...Platform.select({
      ios: {
        shadowColor: BrandColors.PRIMARY_BLUE,
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  catIconWrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  catInfo: {
    flex: 1,
  },
  catTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  catSub: {
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.TEXT_SECONDARY,
  },
  chevronWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
});
