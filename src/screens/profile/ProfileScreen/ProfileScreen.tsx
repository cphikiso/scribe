import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./styles";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>PROFILE</Text>
    </View>
  );
};

export default ProfileScreen;
