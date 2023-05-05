import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../../../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { colors } from "../../../../../components/colors";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

const EditUsernameScreen = () => {
  const { currentUser } = useAuth();

  const [username, setUsername] = useState<string>(currentUser?.username);

  const navigation = useNavigation();

  const updateFullName = () => {
    console.log("updating username", username);
    updateDoc(doc(db, "users", currentUser?.uid), {
      username,
    }).then(() => {
      navigation.goBack();
    });
  };

  const disabled = username.length < 3;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={disabled}
          style={{
            marginRight: Platform.OS === "web" && 16,
          }}
          onPress={() => {
            if (!disabled) {
              updateFullName();
            }
          }}
        >
          <Text
            style={{
              fontFamily: "SFProRoundedHeavy",
              fontSize: 17,
              color: !disabled ? colors.purple : colors.purpl30,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, disabled, username]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.purple} />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
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
          placeholder="Choose your username"
          autoFocus
          selectionColor={colors.purple}
          cursorColor={colors.purple}
        />
      </View>
    </View>
  );
};

export default EditUsernameScreen;
