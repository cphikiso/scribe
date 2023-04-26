import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../../../components/colors";

const EnterUsernameScreen = () => {
  const [username, setUsername] = useState<string>("");

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
      <StatusBar style="light" />

      <TextInput
        style={styles.textInput}
        placeholder="@username"
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        autoCapitalize="words"
        autoCorrect={false}
        value={username}
        onChangeText={(text) => {
          const alphanumericRegex = /[^a-zA-Z0-9]/g;
          const cleanedText = text.replace(alphanumericRegex, "");

          if (cleanedText.includes(" ")) {
            setUsername(cleanedText.trim().toLowerCase());
          } else {
            setUsername(cleanedText.toLowerCase());
          }
        }}
        autoFocus={true}
        cursorColor="#FFF"
        selectionColor={"#FFF"}
        maxLength={18}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,

          paddingTop: Platform.OS === "android" ? "70%" : "60%",
          paddingVertical: 16,
        }}
        //keyboardVerticalOffset={10}
      >
        <TouchableOpacity
          disabled={username.length <= 3}
          onPress={() => {
            //   updateFirstName();
            //   navigation.navigate("CreateUsername");
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor:
                username.length > 3 ? "#FFF" : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: username.length > 3 ? colors.purple : colors.purpl30,
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EnterUsernameScreen;
