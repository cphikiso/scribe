import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 148 : 108,
  },
  textInput: {
    height: 60,
    width: "100%",
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
