import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  const [transcribedText, setTranscribedText] = useState("");

  const { audioURI, audioDuration } = useRoute().params;

  let sound; // Declare sound variable in the outer scope
  async function callWhisper(prompt) {
    try {
      const response = await fetch(
        "https://us-central1-scribe-speak-your-mind.cloudfunctions.net/callWhisper",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );
      if (response.status == 200) {
        const data = await response.json();

        if (data.text) {
          setTranscribedText(data.text);
          setTranscribing(false);
        } else {
          console.error("Error: data or data.text is undefined.");
        }
      }
    } catch (error) {
      Alert.alert(error.message);
      console.warn(error);
    }
  }

  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioURI },
      { shouldPlay: true }
    );
    sound = newSound;

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isPlaying && status.didJustFinish) {
        setListening(false);
        setPlaying(false);
      }
    });

    await sound.playAsync();
  }

  function stopSound() {
    if (sound) {
      sound.stopAsync();
    } else {
      null;
    }
  }

  useEffect(() => {
    callWhisper(audioURI);
  }, []);

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
          <Text style={styles.bodyText}>{transcribedText}</Text>
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
