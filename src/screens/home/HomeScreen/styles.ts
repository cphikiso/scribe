import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  plusCircle: {
    position: "absolute",
    bottom: 16,
    right: 16,
    height: 48,
    width: 48,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: "#FFF",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(60,60,67,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContentContainer: {
    flex: 1,
    // alignItems: "center",
    //paddingTop: 8,
    borderRadius: 44,
    //backgroundColor: "red",
    paddingHorizontal: 16,
  },
  touchableWF: { flex: 1, width: "100%" },
  bottomSheet: {
    flex: 1,
    borderRadius: 44,
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    shadowColor: "rgba(60,60,67,0.6)",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
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
