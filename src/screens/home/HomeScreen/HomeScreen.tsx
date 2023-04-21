import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.plusCircle}
        onPress={() => console.log("press")}
      >
        <AntDesign name="pluscircle" size={44} color="black" />
      </TouchableOpacity>

      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

export default HomeScreen;
