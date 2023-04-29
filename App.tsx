import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/home/HomeScreen/HomeScreen";
import AppNavigator from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/hooks/useAuth";

export default function App() {
  const [fontsLoaded] = useFonts({
    SFProRoundedBold: require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
    SFProRoundedHeavy: require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    SFProRoundedMedium: require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    SFProRoundedRegular: require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SFProRoundedSemibold: require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer onReady={onLayoutRootView}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
