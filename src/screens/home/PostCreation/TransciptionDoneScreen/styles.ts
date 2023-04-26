import { StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingHorizontal: 16,
  },
  timerText: {
    fontSize: 18,
    fontFamily: "SFProRoundedBold",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 18,
    fontFamily: "SFProRoundedMedium",
    color: "rgba(255,255,255,0.8)",
  },
  postButton: {
    width: "100%",
    backgroundColor: "#FFF",
    height: 58,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 44,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.purple,
    fontSize: 20,
    fontFamily: "SFProRoundedHeavy",
  },
});
