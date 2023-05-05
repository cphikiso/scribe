import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { styles } from "./styles";
import useAuth from "../../../hooks/useAuth";
import { colors } from "../../../../components/colors";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const EditProfileScreen = () => {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState<string>(currentUser?.username);
  const [fullName, setFullName] = useState<string>(currentUser?.fullName);
  const [bio, setBio] = useState<string>(currentUser?.bio);

  const navigation = useNavigation();

  const updateUsername = () => {
    console.log("updating username", username);
    updateDoc(doc(db, "users", currentUser?.uid), {
      username: username,
    });
  };
  const updateFullName = () => {
    console.log("updating full name", fullName);
    updateDoc(doc(db, "users", currentUser?.uid), {
      fullName,
    });
  };
  const updateBio = () => {
    console.log("updating bio", bio);
    updateDoc(doc(db, "users", currentUser?.uid), {
      bio,
    });
  };
  const disabled = username.length < 3 || bio.length < 3 || fullName.length < 3;
  const updateProfile = () => {
    updateUsername();
    updateFullName();
    updateBio();
    navigation.goBack();
  };

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
              updateProfile();
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
  }, [navigation, disabled, username, fullName, bio]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/pic.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            autoCapitalize="words"
            autoCorrect={false}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            autoFocus={true}
            cursorColor={colors.purple}
            selectionColor={colors.purple}
            maxLength={18}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="@username"
            placeholderTextColor={"rgba(255,255,255,0.5)"}
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
            cursorColor={colors.purple}
            selectionColor={colors.purple}
            maxLength={18}
          />
        </View>

        <View
          style={[
            styles.rowContainer,
            { height: 120, alignItems: "flex-start", paddingTop: 12 },
          ]}
        >
          <Text style={styles.label}>Biography</Text>
          <TextInput
            style={[styles.input, { marginTop: 12 }]}
            placeholder="Biography ..."
            placeholderTextColor={colors.grey60}
            autoCorrect={false}
            value={bio}
            onChangeText={setBio}
            autoFocus={true}
            cursorColor={colors.purple}
            selectionColor={colors.purple}
            maxLength={120}
            multiline={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
