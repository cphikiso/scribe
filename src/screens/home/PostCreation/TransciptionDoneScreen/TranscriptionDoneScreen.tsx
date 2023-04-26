import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Lottie from "lottie-react-native";
import { styles } from "./styles";
import Animated, { FadeIn } from "react-native-reanimated";

const TranscriptionDoneScreen = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <TouchableOpacity
            style={{
              height: 52,
              width: 52,
              borderRadius: 52,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setPlaying(!playing)}
          >
            {!playing ? (
              <Animated.Image
                entering={FadeIn.duration(500)}
                style={{ height: 38, width: 38, left: 2 }}
                source={require("../../../../../assets/appIcons/playWhite.png")}
              />
            ) : (
              <Animated.Image
                entering={FadeIn.duration(500)}
                style={{ height: 38, width: 38 }}
                source={require("../../../../../assets/appIcons/pauseWhite.png")}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              height: 80,
              justifyContent: "center",
              alignItems: "center",

              width: "60%",
            }}
          >
            <Lottie
              source={require("../../../../../assets/soundwaves.json")}
              autoPlay={false}
              loop
            />
          </View>
          <Text style={styles.timerText}>{`00:04.59`}</Text>
        </View>
        <Text style={styles.bodyText}>
          these aren’t just random questions. they reveal (and motivate) some
          key design decisions. for each of these, what do you *want* the answer
          to be, and why? what is the “price” of your chosen answer?
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.postButton}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TranscriptionDoneScreen;
