import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./styles";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>SEARCH SCREEN</Text>
    </View>
  );
};

export default SearchScreen;
