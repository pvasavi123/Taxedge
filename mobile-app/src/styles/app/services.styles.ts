/**
 * Screen: Services
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet } from "react-native";
import {
  BorderRadius,
  BorderWidth,
  Spacing,
  Typography,
} from "../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  searchBar: {
    height: 48,
    borderRadius: BorderRadius.sm + 2,
    borderWidth: BorderWidth.regular,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: Spacing.sm,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  categoriesContainer: {
    marginBottom: Spacing.sm,
  },
  pillsScroll: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  pillBtn: {
    paddingHorizontal: Spacing.base,
    height: 38,
    borderRadius: 19,
    borderWidth: BorderWidth.regular,
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
  },
  listContent: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  serviceCard: {
    borderRadius: BorderRadius.base - 2,
    borderWidth: BorderWidth.regular,
    padding: Spacing.base,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm + 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  serviceName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  catBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
    marginTop: Spacing.xs,
  },
  catBadgeText: {
    fontSize: Typography.fontSize.xs - 1,
    fontWeight: Typography.fontWeight.extraBold,
  },
  serviceDesc: {
    fontSize: Typography.fontSize.sm + 1,
    marginTop: Spacing.md,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: Spacing.md,
    borderTopWidth: BorderWidth.thin,
    borderTopColor: "#00000005",
  },
  docsCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  docsCountText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionBtnText: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  emptySub: {
    fontSize: Typography.fontSize.sm + 1,
    marginTop: 6,
  },
});
