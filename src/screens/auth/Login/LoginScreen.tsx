import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../components/colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const insets = useSafeAreaInsets();

  //const {promptAsync} = useAuth()
  const { signInWithEmail } = useAuth();

  function dismissKeyboard() {
    if (Platform.OS != "web") {
      Keyboard.dismiss();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <View
        style={[
          styles.container,
          Platform.OS === "ios" && {
            paddingTop: insets.top + 28,
            paddingBottom: insets.bottom + 28,
          },
        ]}
      >
        <View>
          <Text style={styles.logoText}>Scribe</Text>
          <Text style={styles.subHeader}>Log in to your Scribe account.</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.loginSection}
          keyboardVerticalOffset={120}
        >
          <View
            style={[
              styles.loginSection,
              Platform.OS === "android" && { top: -80 },
            ]}
          >
            <TextInput
              selectionColor={colors.purple}
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />

            <TextInput
              selectionColor={colors.purple}
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => signInWithEmail(email, password)}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={[styles.signUpText, { color: colors.grey30 }]}>
                Forgotten Password
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          pressRetentionOffset={{ top: 44, left: 44, bottom: 44, right: 44 }}
          style={styles.signUpButton}
          onPress={() => navigation.navigate("EnterName")}
        >
          <Text style={styles.signUpText}>Sign Up for Scribe App</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
