import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./styles";

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>NOTIFICATIONS SCREEN</Text>
    </View>
  );
};

export default NotificationsScreen;
