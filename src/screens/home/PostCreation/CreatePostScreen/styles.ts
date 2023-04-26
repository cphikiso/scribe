import { StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },

  seeThrough: { flex: 2, width: "100%" },
  touchableWithoutFeedback: {
    height: "100%",
    width: "100%",
  },
  bottomSheet: {
    flex: 1.8,
    marginBottom: 44,
    borderRadius: 44,
    backgroundColor: colors.purple,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "rgba(60,60,67,0.6)",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  // From HomeScreen

  cancel: {
    height: 18,
    position: "absolute",
    left: 18,
    width: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: "SFProRoundedMedium",
    color: "#000",
  },
  timerText: {
    fontSize: 14,
    fontFamily: "SFProRoundedMedium",
    color: "rgba(60,60,67,0.6)",
    textAlign: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
    color: "#000",
    textAlign: "center",
    marginBottom: 18,
  },
  playbackIconContainer: { alignSelf: "center", marginBottom: 28 },
  modalButton: {
    width: "100%",
    backgroundColor: "#000",
    height: 58,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
  },
  waveForm: { paddingHorizontal: 16, height: 160 },
});
