import { StyleSheet } from "react-native";
import { colors } from "../../../../components/colors/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 148,
  },

  contact: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height: 68,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhiteTwo,
  },
  avatarName: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "SFProRoundedBold",
    color: colors.smoothBlack,
  },
  inviteButton: {
    borderColor: colors.primaryPink,
    borderWidth: 1,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  inviteText: {
    color: colors.primaryPink,
    fontSize: 14,
    fontFamily: "SFProRoundedBold",
  },
});
