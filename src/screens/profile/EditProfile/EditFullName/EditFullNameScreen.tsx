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

const EditFullNameScreen = () => {
  const { currentUser } = useAuth();

  const [fullName, setFullName] = useState<string>(currentUser?.fullName);

  const navigation = useNavigation();

  const updateFullName = () => {
    console.log("updating full name", fullName);
    updateDoc(doc(db, "users", currentUser?.uid), {
      fullName,
    }).then(() => {
      navigation.goBack();
    });
  };

  const disabled = fullName.length < 3;

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
  }, [navigation, disabled, fullName]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.purple} />
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          placeholder="Enter your full name"
          autoFocus
          selectionColor={colors.purple}
          cursorColor={colors.purple}
        />
      </View>
    </View>
  );
};

export default EditFullNameScreen;
