/**
 * Screen: Documents Vault
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet } from "react-native";
import { Spacing } from "../../../shared/theme";

export const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
  },
  responsiveContainer: {
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    gap: 14,
  },
});
