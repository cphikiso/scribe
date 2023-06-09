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
import CreatePostScreen from "../screens/home/PostCreation/CreatePostScreen/CreatePostScreen";
import { useNavigation } from "@react-navigation/core";
import TranscriptionDoneScreen from "../screens/home/PostCreation/TransciptionDoneScreen/TranscriptionDoneScreen";
import ContactsListScreen from "../screens/profile/ContactsList/ContactsListScreen";
import LandingScreen from "../screens/auth/LandingScreen/LandingScreen";
import EnterNameScreen from "../screens/auth/SignUp/EnterNameScreen/EnterNameScreen";
import EnterUsernameScreen from "../screens/auth/SignUp/EnterUsernameScreen/EnterUsernameScreen";
import EnterPhoneNumberScreen from "../screens/auth/SignUp/EnterPhoneNumberScreen/EnterPhoneNumberScreen";
import ConfirmationCodeScreen from "../screens/auth/SignUp/ConfirmationCodeScreen/ConfirmationCodeScreen";
import EnterEmailScreen from "../screens/auth/SignUp/EnterEmail/EnterEmailScreen";
import CreatePasswordScreen from "../screens/auth/SignUp/CreatePassword/CreatePasswordScreen";
import useAuth from "../hooks/useAuth";
import SettingsScreen from "../screens/profile/SettingsScreen/SettingsScreen";
import EditProfileScreen from "../screens/profile/EditProfile/EditProfileScreen";
import ResetPasswordScreen from "../screens/auth/Login/ResetPassword/ResetPasswordScreen";
import LoginScreen from "../screens/auth/Login/LoginScreen";
import EditFullNameScreen from "../screens/profile/EditProfile/EditFullName/EditFullNameScreen";
import EditUsernameScreen from "../screens/profile/EditProfile/EditUsername/EditUsernameScreen";
import EditBioScreen from "../screens/profile/EditProfile/EditBio/EditBioScreen";
import PostDetailedScreen from "../screens/home/PostDetailed/PostDetailedScreen";

const Tab = createBottomTabNavigator();

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <>
      <TopTab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: colors.grey30,
          tabBarActiveTintColor: colors.purple,
          tabBarContentContainerStyle: { marginTop: insets.top },
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "none",
            fontFamily: "SFProRoundedHeavy",
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.purple,
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
        onPress={() => navigation.navigate("CreatePost")}
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
  const navigation = useNavigation();

  const { user, currentUser } = useAuth();
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

      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SFProRoundedHeavy",
                color: colors.purple,
              }}
            >
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
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SFProRoundedHeavy",
                color: colors.purple,
              }}
            >
              @{currentUser?.username || user?.fullName}
            </Text>
          ),
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
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
                  source={
                    currentUser?.profilePicture
                      ? { uri: currentUser?.profilePicture }
                      : require("../../assets/picBlack.png")
                  }
                  style={{ height: 24, width: 24, borderRadius: 24 }}
                />
              </View>
            ) : (
              <Image
                source={
                  currentUser?.profilePicture
                    ? { uri: currentUser?.profilePicture }
                    : require("../../assets/pic.png")
                }
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
  const navigation = useNavigation();
  const { user, currentUser } = useAuth();

  console.log("user", user, "current", currentUser);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="TabStack" component={TabNavigator} />
          <Stack.Group
            screenOptions={{
              headerShown: true,
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: "SFProRoundedHeavy",
                color: colors.purple,
              },
              headerShadowVisible: false,
              headerTintColor: colors.purple,
            }}
          >
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="EditProfile"
              options={{ title: "Edit Profile" }}
              component={EditProfileScreen}
            />
            <Stack.Screen
              name="PostDetailed"
              options={{ title: "Post", headerBackTitleVisible: false }}
              component={PostDetailedScreen}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      fontFamily: "SFProRoundedRegular",
                      fontSize: 17,
                      color: colors.purple,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              ),
            }}
          >
            <Stack.Screen
              options={{ title: "Edit Full name" }}
              name="EditFullName"
              component={EditFullNameScreen}
            />
            <Stack.Screen
              options={{ title: "Edit username" }}
              name="EditUsername"
              component={EditUsernameScreen}
            />
            <Stack.Screen
              options={{ title: "Edit Biography" }}
              name="EditBio"
              component={EditBioScreen}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.purple },
                headerShadowVisible: false,
                headerTitle: " ",
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 36,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("TabStack")}
                  >
                    <Image
                      source={require("../../assets/appIcons/close.png")}
                      style={{ height: 36, width: 36 }}
                    />
                  </TouchableOpacity>
                ),
              }}
              name="Transcribe"
              component={TranscriptionDoneScreen}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerShown: true,
              presentation: "formSheet",
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: "SFProRoundedHeavy",
                color: colors.purple,
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="Contacts" component={ContactsListScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          {/* AUTH */}
          <Stack.Group>
            <Stack.Screen name="Landing" component={LandingScreen} />
          </Stack.Group>
          {/* sign up flow */}
          <Stack.Group
            screenOptions={{
              headerShown: true,
              headerBackVisible: false,
              headerShadowVisible: false,
              // headerTitle: () => null,
              headerTitleStyle: {
                color: "#fff",
                fontFamily: "SFProRoundedBold",
                fontSize: 22,
              },
              headerStyle: { backgroundColor: colors.purple },
              headerLargeStyle: { backgroundColor: colors.purple },
              headerLargeTitle: true,
              headerLargeTitleStyle: {
                fontFamily: "SFProRoundedBold",
                fontSize: 28,
                color: "#fff",
              },
              headerLeft: ({}) => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                    }}
                    source={require("../../assets/appIcons/carretLeftLargeWhite.png")}
                  />
                </TouchableOpacity>
              ),
            }}
          >
            <Stack.Screen
              options={{
                title: "hi! what's your name?",
              }}
              name="EnterName"
              component={EnterNameScreen}
            />

            <Stack.Screen
              options={{
                title: "next, create your username.",
              }}
              name="EnterUsername"
              component={EnterUsernameScreen}
            />

            <Stack.Screen
              options={{
                title: "great! now what's ur email.",
              }}
              name="EnterEmail"
              component={EnterEmailScreen}
            />
            <Stack.Screen
              options={{
                title: "Lastly, create a password",
              }}
              name="CreatePassword"
              component={CreatePasswordScreen}
            />

            <Stack.Screen
              options={{
                title: "great! now just ur number.",
              }}
              name="EnterNumber"
              component={EnterPhoneNumberScreen}
            />

            <Stack.Screen
              options={{
                title: "please enter the code we sent you.",
              }}
              name="ConfirmationCode"
              component={ConfirmationCodeScreen}
            />

            <Stack.Screen
              options={{
                title: "Forgot your password?",
              }}
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
          </Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
