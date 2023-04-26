import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "./styles";
import Lottie from "lottie-react-native";
import { Audio } from "expo-av";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../../components/colors";

const CreatePostScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [recordingProcess, setRecordingProcess] = useState(true);
  const [listening, setListening] = useState(false);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <View style={styles.modal}>
      <View style={styles.seeThrough}>
        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedback}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.bottomSheet}>
        <View style={styles.headerModal}>
          <Text style={{ color: colors.purple }}>nulls</Text>
          <Text style={styles.modalHeader}>Recording</Text>
          <TouchableOpacity
            style={styles.cancel}
            hitSlop={{ top: 44, bottom: 44, left: 44, right: 44 }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../../../../assets/appIcons/close.png")}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[styles.timerText, !recording && { color: colors.purple }]}
        >{`00:04.59`}</Text>
        <View style={styles.waveForm}>
          {recordingProcess ? (
            <Lottie
              source={require("../../../../../assets/soundwaves.json")}
              autoPlay
              loop
            />
          ) : (
            <Text
              style={[
                styles.timerText,
                { fontSize: 38, top: 50, color: "white" },
              ]}
            >
              00:04.59
            </Text>
          )}
        </View>
        {recordingProcess ? (
          <TouchableOpacity
            onPress={() => {
              setListening(false);
              setRecordingProcess(false);
            }}
            style={{ alignSelf: "center" }}
          >
            <Ionicons name="ios-stop-circle-outline" size={68} color="white" />
          </TouchableOpacity>
        ) : (
          <>
            <View>
              {!listening ? (
                <TouchableOpacity
                  onPress={() => setListening(true)}
                  style={styles.playbackIconContainer}
                >
                  <Ionicons
                    name="ios-play-circle-outline"
                    size={68}
                    color="white"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setListening(false)}
                  style={styles.playbackIconContainer}
                >
                  <Ionicons
                    name="ios-pause-circle-outline"
                    size={68}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.buttonText}>Transcribe</Text>
              {/* Start scribing */}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CreatePostScreen;
