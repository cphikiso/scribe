import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 148 : 108,
    justifyContent: "space-between",
  },

  textInput: {
    height: 60,
    width: "100%",
    backgroundColor: colors.grey30,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.purpl30,
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
    fontFamily: "SFProRoundedBold",
    fontSize: 17,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },

  rowContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  universityLogo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logoText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
  },
  universityTexts: {},
  name: {
    fontSize: 15,
    fontFamily: "SFProRoundedBold",
    color: "#FFF",
    textAlign: "center",
  },
  shortName: {
    fontSize: 15,
    fontFamily: "SFProRoundedMedium",
    color: colors.purpl30,
    textAlign: "center",
  },
});
