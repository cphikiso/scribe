import { StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  rowContainer: {
    flexDirection: "row",

    height: 56,

    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  label: {
    fontSize: 17,
    fontFamily: "SFProRoundedBold",
    color: colors.purple,
  },
  input: {
    fontSize: 17,
    fontFamily: "SFProRoundedBold",
    paddingVertical: 16,
    width: "74%",
    position: "absolute",
    marginLeft: 100,
  },
});
