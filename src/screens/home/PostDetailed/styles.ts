import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  outerFlexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerFlexRow: { flexDirection: "row", maxWidth: "80%" },
  profilePic: {
    height: 44,
    width: 44,
    borderRadius: 44,
    marginRight: 12,
  },
  titleRow: { flexDirection: "row" },
  name: {
    color: "#000",
    marginRight: 4,
    fontFamily: "SFProRoundedBold",
    marginBottom: 2,
    fontSize: 16,
  },
  username: {
    color: "rgba(60,60,67, 0.6)",
    fontFamily: "SFProRoundedMedium",
    fontSize: 16,
    marginRight: 4,
    marginBottom: 4,
  },
  dot: {
    height: 2,
    width: 2,
    borderRadius: 2,
    backgroundColor: "rgba(60,60,67,0.6)",
    marginRight: 4,

    alignSelf: "center",
  },
  timeText: {
    color: "rgba(60,60,67, 0.6)",
    fontFamily: "SFProRoundedMedium",
    fontSize: 16,
  },
  bodyText: {
    color: "rgb(60,60,67)",
    fontFamily: "SFProRoundedRegular",
    fontSize: 16,
    lineHeight: 24,
  },
  playAudioButton: {
    marginRight: 20,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F5F5F5",
    paddingVertical: 16,
    marginTop: 16,
    flexDirection: "row",
  },
  number: {
    fontFamily: "SFProRoundedBold",
    fontSize: 16,
    color: "#000",
    marginRight: 4,
  },
  likeCount: {
    fontFamily: "SFProRoundedRegular",
    fontSize: 16,
    color: "rgba(60,60,67,0.6)",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 32,
    paddingLeft: 48,
  },

  icon: {
    alignItems: "center",
    height: 44,
    width: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionText: {
    color: "rgba(60,60,67,0.6)",
    fontFamily: "SFProRoundedRegular",
    fontSize: 14,
  },
});
