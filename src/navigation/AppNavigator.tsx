import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/home/HomeScreen/HomeScreen";
import SearchScreen from "../screens/search/SearchScreen/SearchScreen";
import ProfileScreen from "../screens/profile/ProfileScreen/ProfileScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EveryoneScreen from "../screens/home/EveryoneScreen/EveryoneScreen";
import TopTabBar from "./TopTabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: { marginTop: insets.top },
        tabBarLabelStyle: { fontSize: 14, textTransform: "none" },
        tabBarIndicatorStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      <TopTab.Screen
        name="Foryou"
        options={{ title: "For you" }}
        component={HomeScreen}
      />
      <TopTab.Screen name="Everyone" component={EveryoneScreen} />
    </TopTab.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#FFF" }}>
      <Tab.Screen
        name="Home"
        component={TopTabs}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
          title: null,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-search" size={24} color={color} />
          ),
          title: null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/pic.jpg")}
              style={{ height: 28, width: 28, borderRadius: 12 }}
            />
          ),
          title: null,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
