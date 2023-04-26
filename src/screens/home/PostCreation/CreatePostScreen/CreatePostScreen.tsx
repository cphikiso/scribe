import { View, Text } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "./styles";

const CreatePostScreen = ({ navigation }) => {
  return (
    <View style={styles.modal}>
      <View style={styles.seeThrough}>
        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedback}
          onPress={() => navigation.goBack()}
        ></TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomSheet}>
        <Text>Modal square</Text>
      </View>
    </View>
  );
};

export default CreatePostScreen;
