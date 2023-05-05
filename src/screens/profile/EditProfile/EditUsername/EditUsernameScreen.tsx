import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../../../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import { colors } from "../../../../../components/colors";

const EditUsernameScreen = () => {
  const { currentUser } = useAuth();

  const [username, setUsername] = useState<string>(currentUser?.username);

  const navigation = useNavigation();

  const updateFullName = () => {
    console.log("updating username", username);
    updateDoc(doc(db, "users", currentUser?.uid), {
      username,
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
  }, [navigation, disabled]);
  return (
    <View>
      <Text>EditUsernameScreen</Text>
    </View>
  );
};

export default EditUsernameScreen;
