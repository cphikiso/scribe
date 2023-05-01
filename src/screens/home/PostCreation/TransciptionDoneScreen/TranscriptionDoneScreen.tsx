import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Lottie from "lottie-react-native";
import { styles } from "./styles";
import Animated, { FadeIn } from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";

const TranscriptionDoneScreen = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);
  const [transcribing, setTranscribing] = useState(true);
  const [listening, setListening] = useState(false);

  const { audioURI, audioDuration } = useRoute().params;

  console.log(audioURI, audioDuration);

  let sound; // Declare sound variable in the outer scope

  async function playSound() {
    console.log("Loading Sound");
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioURI },
      { shouldPlay: true }
    );
    sound = newSound;
    console.log("Playing Sound", sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isPlaying && status.didJustFinish) {
        setListening(false);
        setPlaying(false);
        console.log("Sound stopped");
      }
    });

    await sound.playAsync();
  }

  function stopSound() {
    console.log("Stopping Sound");
    if (sound) {
      sound.stopAsync();
    } else {
      console.log("Sound not loaded yet");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View>
        <View style={styles.audioPlayerRow}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              setPlaying(!playing);
              playing ? stopSound() : playSound();
            }}
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
          <View style={styles.lottieWave}>
            <Lottie
              source={require("../../../../../assets/soundwaves.json")}
              autoPlay={false}
              loop
            />
          </View>
          <Text style={styles.timerText}>{audioDuration}</Text>
        </View>
        {transcribing ? (
          <View>
            <ActivityIndicator size={"large"} color="#FFF" />
            <Text style={[styles.timerText, { paddingTop: 18 }]}>
              Transcribing ...
            </Text>
          </View>
        ) : (
          <Text style={styles.bodyText}>
            these aren’t just random questions. they reveal (and motivate) some
            key design decisions. for each of these, what do you *want* the
            answer to be, and why? what is the “price” of your chosen answer?
          </Text>
        )}
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
