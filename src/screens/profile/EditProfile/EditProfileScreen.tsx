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

  const updateBio = () => {
    console.log("updating bio", bio);
    updateDoc(doc(db, "users", currentUser?.uid), {
      bio,
    });
  };
  const disabled = username.length < 3 || bio.length < 3 || fullName.length < 3;
  const updateProfile = () => {
    updateUsername();

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
        <TouchableOpacity
          onPress={() => navigation.navigate("EditFullName")}
          style={styles.rowContainer}
        >
          <Text style={styles.label}>Full name</Text>
          <Text style={styles.input}>{currentUser?.fullName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditUsername")}
          style={styles.rowContainer}
        >
          <Text style={styles.label}>Username</Text>
          <Text style={styles.input}>{currentUser?.username}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditBio")}
          style={[
            styles.rowContainer,
            { height: 120, alignItems: "flex-start" },
          ]}
        >
          <Text style={[styles.label, { paddingTop: 16 }]}>Biography</Text>

          <Text style={styles.input}>{currentUser?.bio}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
