import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../components/colors";

const LandingScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? insets.top : 48 },
      ]}
    >
      <Image
        source={require("../../../../assets/wandLogoPurple.png")}
        style={styles.logo}
      />

      <View>
        <Text style={styles.tagline}>
          Share your thoughts {"\n"}with the world.
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EnterName")}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={[
            styles.button,
            { backgroundColor: "rgba(116, 116, 128, 0.08)", marginTop: 14 },
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.purple }]}>
            Log in
          </Text>
        </TouchableOpacity>

        <Text style={[styles.footerText, { margin: insets.bottom + 16 }]}>
          By continuing you agree to Scribe's{" "}
          <Text style={{ color: colors.purple60 }}>Terms of Service</Text> and{" "}
          <Text style={{ color: colors.purple60 }}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen;
