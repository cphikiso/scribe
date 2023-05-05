import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 44,
  },
  image: { height: 100, width: 100, borderRadius: 60 },
  infoContainer: {
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
  },
  rowContainer: {
    flexDirection: "row",

    height: 56,

    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  label: {
    fontSize: 16,
    fontFamily: "SFProRoundedBold",
  },
  input: {
    fontSize: 16,
    fontFamily: "SFProRoundedBold",
    paddingVertical: 16,
    width: "74%",
    position: "absolute",
    marginLeft: 100,
  },
});
