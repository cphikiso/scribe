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

  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
});
