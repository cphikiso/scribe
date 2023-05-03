import { StyleSheet } from "react-native";
import { colors } from "../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  logoText: {
    fontSize: 84,
    color: colors.purple,
    fontFamily: "SFProRoundedHeavy",
  },
  subHeader: {
    fontSize: 16,
    fontFamily: "SFProRoundedBold",
    color: colors.grey30,
    textAlign: "center",
  },
  loginSection: {
    width: "100%",
  },
  textInput: {
    height: 60,
    width: "100%",
    backgroundColor: "rgba(118, 118, 128, 0.12)",
    borderRadius: 12,
    paddingLeft: 16,
    fontFamily: "SFProRoundedSemibold",
    fontSize: 20,
    color: colors.smoothBlack,
    marginBottom: 28,
  },
  loginButton: {
    height: 60,
    width: "100%",
    backgroundColor: colors.purple,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
    color: "#FFF",
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "SFProRoundedBold",
    color: colors.smoothBlack,
    textAlign: "center",
  },
});
