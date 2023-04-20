import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./styles";

const EveryoneScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Everyone!</Text>
    </View>
  );
};

export default EveryoneScreen;
