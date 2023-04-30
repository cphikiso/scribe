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

const EnterNameScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>("");

  // const updateFirstName = () => {
  //   if (fullName.length > 3) {
  //     updateDoc(doc(db, "users", currentUser?.uid), {
  //       fullName,
  //     });
  //   }
  // };

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
      <StatusBar style="light" />

      <TextInput
        style={styles.textInput}
        placeholder="Full Name"
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        autoCapitalize="words"
        autoCorrect={false}
        value={fullName}
        onChangeText={setFullName}
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
          disabled={fullName.length <= 3}
          onPress={() => {
            //   updateFirstName();
            navigation.navigate("EnterUsername", {
              fullName,
            });
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor:
                fullName.length > 3 ? "#FFF" : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: fullName.length > 3 ? colors.purple : colors.purpl30,
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

export default EnterNameScreen;
