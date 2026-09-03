/**
 * Screen: Notifications Center
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
  listContent: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  notifCard: {
    borderRadius: BorderRadius.md,
    borderWidth: BorderWidth.regular,
    padding: Spacing.base,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  notifContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  notifHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  notifTitle: {
    fontSize: Typography.fontSize.base - 2,
    fontWeight: Typography.fontWeight.bold,
    flex: 1,
    marginRight: Spacing.sm,
  },
  notifTime: {
    fontSize: Typography.fontSize.xs - 1,
    fontWeight: Typography.fontWeight.medium,
  },
  notifBody: {
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
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
