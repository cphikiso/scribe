import { View, Text } from "react-native";
import React from "react";

const EditProfileScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Text
        style={{
          fontFamily: "SFProRoundedHeavy",
          fontSize: 28,
          color: "rgba(112, 112, 112, 0.2)",
          textAlign: "center",
        }}
      >
        {" "}
        Work in progress ...{"\n"} nothing to see here yet
      </Text>
    </View>
  );
};

export default EditProfileScreen;
