import { StyleSheet } from "react-native";
import { BrandColors, BorderRadius } from "../../shared/theme";

export const progressStyles = StyleSheet.create({
  progressBarTrack: {
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: BorderRadius.xs,
  },
  stepperNodeCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  stepperNodeCircleCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  stepperNodeCirclePending: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: BrandColors.WHITE,
    zIndex: 2,
  },
  stepperLineActive: {
    backgroundColor: BrandColors.PRIMARY_ORANGE,
  },
  stepperLineCompleted: {
    backgroundColor: "#16A34A",
  },
  stepperLinePending: {
    backgroundColor: "#E2E8F0",
  },
});
