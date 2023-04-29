import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";

import { useRoute } from "@react-navigation/native";
import useAuth from "../../../../hooks/useAuth";
import { colors } from "../../../../../components/colors";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";

const CreatePasswordScreen = ({ navigation }) => {
  const { params } = useRoute();
  const { signUp, user } = useAuth();
  const [password, setPassword] = useState<string>("");

  const { fullName, username, email } = params;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TextInput
        secureTextEntry={true}
        autoComplete="password"
        style={styles.textInput}
        placeholder="password"
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(text) => {
          if (text.includes(" ")) {
            setPassword(text.trim());
          } else {
            setPassword(text);
          }
        }}
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
          disabled={password.length <= 6}
          onPress={() => {
            signUp(email, password, username, fullName).catch((error) => {
              Alert.alert(error.message);
            });
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor:
                password.length > 6 ? "#FFF" : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: password.length > 6 ? colors.purple : colors.purpl30,
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

export default CreatePasswordScreen;
