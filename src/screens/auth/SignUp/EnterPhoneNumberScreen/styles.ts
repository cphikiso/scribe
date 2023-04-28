import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 148 : 28,
  },

  contentContainer: { paddingBottom: 48 },
  scrollView: {
    flex: 2,
    marginTop: 16,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  countryListContainer: {
    justifyContent: "center",
    marginBottom: 20,
  },
  textsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 15,
    fontFamily: "SFProRoundedBold",
    color: "#000",
    // marginBottom: 16,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 60,
    width: "22%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "rgba(255, 255, 255, 0.6)",

    alignItems: "center",
  },
  pickerText: {
    fontFamily: "SFProRoundedSemibold",
    fontSize: 16,
    color: "#FFF",
  },
  textInput: {
    height: 60,
    width: "75%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "rgba(255, 255, 255, 0.6)",
    paddingLeft: 16,
    fontFamily: "SFProRoundedSemibold",
    fontSize: 28,
    color: "#FFF",
    marginBottom: 28,
  },

  nextButton: {
    height: 58,
    width: "100%",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  buttonText: {
    fontFamily: "SFProRoundedHeavy",
    fontSize: 20,
  },

  // confirm modal
  seeThrough: { flex: 2, width: "100%" },
  touchableWithoutFeedback: {
    height: "100%",
    width: "100%",
  },
  bottomSheet: {
    flex: 1.3,
    marginBottom: 100,
    borderRadius: 44,
    backgroundColor: "#FFF",
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

  headerModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 16,
    paddingRight: 16,
    marginBottom: 4,
  },
  cancel: {
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: colors.purple60,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
    color: "#FFF",
  },
  confirmContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  confirmText: {
    fontSize: 28,
    fontFamily: "SFProRoundedHeavy",
    color: colors.grey100,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    backgroundColor: colors.purple,
    height: 58,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
  },
  // confirm modal
});
