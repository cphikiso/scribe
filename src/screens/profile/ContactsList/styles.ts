import { StyleSheet } from "react-native";
import { colors } from "../../../../components/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  contact: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height: 68,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(60, 60, 67, 0.19)",
  },
  avatarName: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "SFProRoundedBold",
    color: "#000",
  },
  inviteButton: {
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  inviteText: {
    color: colors.purple,
    fontSize: 14,
    fontFamily: "SFProRoundedHeavy",
  },
});
