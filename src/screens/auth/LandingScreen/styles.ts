import { StyleSheet } from "react-native";
import { colors } from "../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  logo: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  tagline: {
    fontSize: 32,
    fontFamily: "SFProRoundedHeavy",
    textAlign: "left",
    alignSelf: "center",
  },
  button: {
    height: 58,
    backgroundColor: colors.purple,
    borderRadius: 58,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "SFProRoundedHeavy",
    color: "#FFF",
    fontSize: 20,
  },
  footerText: {
    fontFamily: "SFProRoundedMedium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    color: "rgba(60, 60, 67, 0.6)",
  },
});
