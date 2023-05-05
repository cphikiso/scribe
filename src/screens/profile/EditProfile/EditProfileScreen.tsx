import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import useAuth from "../../../hooks/useAuth";
import { colors } from "../../../../components/colors";

const EditProfileScreen = () => {
  const { currentUser } = useAuth();
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
            value={currentUser.fullName}
            //onChangeText={setFullName}
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
            autoCapitalize="words"
            autoCorrect={false}
            value={currentUser.username}
            //onChangeText={setFullName}
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
            autoCapitalize="words"
            autoCorrect={false}
            //value={currentUser?.bio}
            //onChangeText={setFullName}
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
