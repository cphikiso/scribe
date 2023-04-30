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
    flex: 1.28,
    marginBottom: 32,
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
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 28,
  },
  cancel: {
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: "SFProRoundedMedium",
    color: "#FFF",
  },
  timerText: {
    fontSize: 18,
    fontFamily: "SFProRoundedBold",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },

  largeTimerText: {
    fontFamily: "SFProRoundedBold",
    textAlign: "center",
    fontSize: 38,
    color: "white",
    marginBottom: 8,
  },
  modalHeader: {
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
    color: "#FFF",
  },
  playbackIconContainer: { alignSelf: "center", marginBottom: 28 },
  modalButton: {
    width: "90%",
    backgroundColor: "#FFF",
    height: 58,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.purple,
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
  },
  waveForm: { paddingHorizontal: 16, height: 120 },
});
