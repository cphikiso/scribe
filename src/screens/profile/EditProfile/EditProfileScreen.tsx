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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

const EditProfileScreen = () => {
  const { currentUser } = useAuth();

  const navigation = useNavigation();

  const [image, setImage] = useState(currentUser?.profilePicture);
  // const [loadingImage, setLoadingImage] = useState(false);
  // const [doneButton, setDoneButton] = useState(false);

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    // blob.close();

    return await getDownloadURL(fileRef).then((url) => {
      updateDoc(doc(db, "users", currentUser?.uid), {
        profilePicture: url,
      });
    });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setLoadingImage(true);
      // setDoneButton(true);

      setImage(result.assets[0].uri);
      uploadImageAsync(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={
            currentUser?.profilePicture
              ? { uri: currentUser?.profilePicture }
              : require("../../../../assets/pic.jpg")
          }
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
