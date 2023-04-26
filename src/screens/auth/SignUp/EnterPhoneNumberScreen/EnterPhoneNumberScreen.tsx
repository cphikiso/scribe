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

const EnterPhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
      <StatusBar style="light" />

      <TextInput
        style={styles.textInput}
        placeholder="+44 123456789"
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        autoCorrect={false}
        value={phoneNumber}
        inputMode="numeric"
        keyboardType="phone-pad"
        onChangeText={(text) => {
          setPhoneNumber(text);
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
          disabled={phoneNumber.length <= 7}
          onPress={() => {
            //   updateFirstName();
            navigation.navigate("ConfirmationCode");
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor:
                phoneNumber.length > 7 ? "#FFF" : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: phoneNumber.length > 7 ? colors.purple : colors.purpl30,
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

export default EnterPhoneNumberScreen;
