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
import { doc, updateDoc } from "firebase/firestore";
import useAuth from "../../../../hooks/useAuth";
import { auth, db } from "../../../../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { colors } from "../../../../../components/colors";

const ResetPasswordScreen = ({ navigation }) => {
  const { currentUser } = useAuth();

  const [email, setEmail] = useState<string>("");

  const resetPassword = () => {
    if (email.length > 6) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert("Password reset email sent!");
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={colors.grey30}
        autoCapitalize="words"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        autoFocus={true}
        cursorColor="#FFF"
        selectionColor={"#FFF"}
        maxLength={80}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          disabled={email.length <= 3}
          onPress={() => {
            resetPassword();
            navigation.navigate("Landing");
            // console.log("user", user);
          }}
          style={[
            styles.nextButton,
            { backgroundColor: email.length > 3 ? "#FFF" : colors.grey30 },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: email.length > 3 ? colors.purple : colors.purpl30,
              },
            ]}
          >
            Send Reset Password Link
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPasswordScreen;
