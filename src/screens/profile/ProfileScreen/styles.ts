import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  listHeader: { flexDirection: "row", marginBottom: 16, paddingTop: 16 },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 16,
  },
  nameBio: { marginTop: 8 },
  name: {
    fontFamily: "SFProRoundedHeavy",
    fontSize: 22,
  },
  bio: {
    fontFamily: "SFProRoundedMedium",
    fontSize: 16,
  },
  followFollowing: { flexDirection: "row", marginBottom: 16 },
  followText: {
    fontFamily: "SFProRoundedMedium",
    fontSize: 18,
    marginRight: 16,
  },
  inviteBorder: { height: 1, backgroundColor: "#F5F5F5", marginBottom: 8 },
  inviteButton: {
    height: 58,
    borderRadius: 58,
    width: 192,
    borderWidth: 2,
    borderColor: "rgba(60,60,67,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  inviteText: {
    fontFamily: "SFProRoundedHeavy",
    fontSize: 18,
    color: "rgba(60,60,67,0.3)",
  },
  listEmpty: {
    color: "rgba(60,60,67,0.12)",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 120,
    fontFamily: "SFProRoundedBold",
    fontSize: 28,
  },
});
