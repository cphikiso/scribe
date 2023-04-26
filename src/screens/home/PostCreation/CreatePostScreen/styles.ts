import { StyleSheet } from "react-native";
import { colors } from "../../../../../components/colors";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },

  seeThrough: { flex: 2, width: "100%" },
  touchableWithoutFeedback: {
    height: "100%",
    width: "100%",
  },
  bottomSheet: {
    flex: 1.6,
    marginBottom: 44,
    borderRadius: 44,
    backgroundColor: colors.purple,
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
});
