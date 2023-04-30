import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";

import { useRoute } from "@react-navigation/native";
import { colors } from "../../../../../components/colors";

const EnterEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");

  const { params } = useRoute();

  const { fullName, username } = params;

  const generalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const uclEmailRegex = /^[a-zA-Z0-9._%+-]+@ucl\.ac\.uk$/;

  const validateEmail = (email: string): boolean => {
    return generalEmailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TextInput
        inputMode="email"
        autoComplete="email"
        style={[
          styles.textInput,
          {
            marginBottom: validateEmail(email) ? 8 : 8,
          },
        ]}
        placeholder="you@gmail.com"
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        autoFocus={true}
        cursorColor="#FFF"
        selectionColor={"#FFF"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? "70%" : "60%",
          paddingVertical: 16,
        }}
      >
        <TouchableOpacity
          disabled={!validateEmail(email)}
          onPress={() => {
            navigation.navigate("CreatePassword", {
              email,
              fullName,
              username,
            });
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor: validateEmail(email)
                ? "#FFF"
                : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: validateEmail(email) ? colors.purple : colors.purpl30,
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EnterEmailScreen;
