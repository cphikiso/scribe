import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HomeCreatePostButton = () => {
  return (
    <TouchableOpacity
      style={styles.plusCircle}
      onPress={() => {
        //   setModalVisible(true);
        //   setRecordingProcess(true);
      }}
    >
      <AntDesign name="pluscircle" size={44} color="black" />
    </TouchableOpacity>
  );
};

export default HomeCreatePostButton;

const styles = StyleSheet.create({
  plusCircle: {
    position: "absolute",
    bottom: 16,
    right: 16,
    height: 48,
    width: 48,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: "#FFF",
  },
});
