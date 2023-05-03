import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "./styles";

const EditProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/pic.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>

      <View>
        <View>
          <Text style={styles.label}>FullName</Text>
          <Text style={styles.input}>John Doe</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
