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

const ConfirmationCodeScreen = ({ navigation }) => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
      <StatusBar style="light" />

      <TextInput
        style={styles.textInput}
        placeholder="_ _ _   _ _ _"
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        autoCorrect={false}
        value={confirmationCode}
        inputMode="numeric"
        keyboardType="phone-pad"
        onChangeText={(text) => {
          setConfirmationCode(text);
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
          disabled={confirmationCode.length !== 6}
          onPress={() => {
            //   updateFirstName();
            navigation.navigate("TabStack");
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor:
                confirmationCode.length == 6
                  ? "#FFF"
                  : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  confirmationCode.length == 6 ? colors.purple : colors.purpl30,
              },
            ]}
          >
            Let's go!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConfirmationCodeScreen;
