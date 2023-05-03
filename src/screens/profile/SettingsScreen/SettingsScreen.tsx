import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "./styles";
import useAuth from "../../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../components/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = ({ navigation }) => {
  const { currentUser, onLogout } = useAuth();

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 16 },
      ]}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile")}
        style={{
          flexDirection: "row",
          paddingVertical: 16,
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(118,118,128, 0.06)",

          borderRadius: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../../assets/pic.jpg")}
            style={{ height: 88, width: 88, borderRadius: 88, marginRight: 16 }}
          />
          <View style={{}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "SFProRoundedHeavy",
                marginBottom: 2,
              }}
            >
              {currentUser?.fullName}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SFProRoundedSemibold",
                marginBottom: 2,
                color: "#000",
              }}
            >
              @{currentUser?.username}
            </Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={24}
          color="rgba(118,118,128, 0.60)"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          onLogout();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 16,
          backgroundColor: "rgba(118,118,128, 0.06)",
          height: 58,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "SFProRoundedBold",
            color: colors.red,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
