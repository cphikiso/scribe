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
import { Image, TouchableOpacity, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationsScreen from "../screens/notifications/NotificationsScreen/NotificationsScreen";
import HomeCreatePostButton from "../../components/HomeCreatePost/HomeCreatePostButton";
import { colors } from "../../components/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <TopTab.Navigator
        screenOptions={{
          tabBarContentContainerStyle: { marginTop: insets.top },
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "none",
            fontFamily: "SFProRoundedBold",
          },
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
      <TouchableOpacity
        style={{
          height: 54,
          width: 54,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.purple,
          borderRadius: 44,
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      >
        <Image
          source={require("../../assets/appIcons/plus.png")}
          style={{ height: 28, width: 28 }}
        />
      </TouchableOpacity>
    </>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        title: () => null,
        tabBarInactiveTintColor: "rgba(60,60,67,0.3)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={TopTabs}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons
              name="home"
              size={color === "#000" ? 26 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ios-search"
              size={color === "#000" ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontFamily: "SFProRoundedBold" }}>
              Notifications
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications"
              size={color === "#000" ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,

          headerTitle: () => (
            <Text style={{ fontSize: 18, fontFamily: "SFProRoundedBold" }}>
              @phikiso
            </Text>
          ),
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Ionicons name="ios-ellipsis-horizontal" size={28} color="#000" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) =>
            color === "#000" ? (
              <View
                style={{
                  borderWidth: 2,
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: color,
                }}
              >
                <Image
                  source={require("../../assets/pic.jpg")}
                  style={{ height: 24, width: 24, borderRadius: 24 }}
                />
              </View>
            ) : (
              <Image
                source={require("../../assets/pic.jpg")}
                style={{ height: 28, width: 28, borderRadius: 24 }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
