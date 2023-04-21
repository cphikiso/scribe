import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  plusCircle: {
    position: "absolute",
    bottom: 16,
    right: 16,
    height: 48,
    width: 48,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(60,60,67,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
  },
  modalHeader: {
    fontSize: 20,
  },
});
