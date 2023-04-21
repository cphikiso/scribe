import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 16,
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
  cancelText: {
    fontSize: 14,
    fontFamily: "SFProRoundedMedium",
    color: "#000",
  },
  modalHeader: {
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
    color: "#000",
    textAlign: "center",
  },
});
