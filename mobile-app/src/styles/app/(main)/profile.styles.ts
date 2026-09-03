/**
 * Screen: Profile & Settings
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
  /* Hero */
  hero: {
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 42,
    paddingHorizontal: Spacing.lg,
  },
  avatarWrap: {
    width: 88,
    height: 88,
  },
  avatarBg: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: BorderWidth.thick,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLoading: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  editBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: BorderWidth.thick,
    borderColor: BrandColors.WHITE,
  },
  heroName: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.extraBold,
    marginTop: 14,
  },
  heroId: {
    color: "#C3D5EA",
    fontSize: Typography.fontSize.sm + 0.5,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xs,
  },
  pillRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  pillOutline: {
    backgroundColor: "transparent",
    borderWidth: BorderWidth.thin,
  },
  pillText: {
    color: BrandColors.WHITE,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },

  /* Stats */
  statsCard: {
    flexDirection: "row",
    marginHorizontal: Spacing.base,
    marginTop: -26,
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.thin,
    paddingVertical: Spacing.base,
    ...Platform.select({
      ios: {
        shadowColor: "#04203F",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  statCell: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: Typography.fontSize.xl - 1,
    fontWeight: Typography.fontWeight.extraBold,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.semiBold,
    marginTop: 3,
  },

  /* Menu */
  menuArea: {
    paddingHorizontal: Spacing.base,
    paddingTop: 18,
    gap: 6,
  },
  sectionLabel: {
    fontSize: Typography.fontSize.xs - 1,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.8,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  sectionCard: {
    borderRadius: BorderRadius.base - 2,
    borderWidth: BorderWidth.thin,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  rowBorderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.sm + 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: {
    flex: 1,
    fontSize: Typography.fontSize.base - 2,
    fontWeight: Typography.fontWeight.semiBold,
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    height: 50,
    borderRadius: BorderRadius.base - 2,
    borderWidth: BorderWidth.regular,
    marginTop: Spacing.lg,
  },
  logoutText: {
    fontSize: Typography.fontSize.base - 1,
    fontWeight: Typography.fontWeight.bold,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(5,39,80,0.45)",
    justifyContent: "center",
    padding: Spacing.xl,
  },
  modalContainer: {
    borderRadius: 18,
    padding: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.extraBold,
    marginBottom: 6,
  },
  modalBody: {
    paddingVertical: Spacing.sm,
  },
  modalNote: {
    fontSize: Typography.fontSize.xs - 0.5,
    fontWeight: Typography.fontWeight.medium,
    lineHeight: 17,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.base,
    paddingVertical: 9,
  },
  infoKey: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.medium,
  },
  infoValue: {
    flex: 1,
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.bold,
    textAlign: "right",
  },
  statusLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusLabelText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.extraBold,
  },
});
