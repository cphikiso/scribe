import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "./styles";
import Lottie from "lottie-react-native";
import { Audio } from "expo-av";
import { AntDesign, Ionicons } from "@expo/vector-icons";

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
        <TouchableOpacity
          style={styles.cancel}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.modalHeader}>New Post</Text>

        <Text style={styles.timerText}>00:04.59</Text>
        <View style={styles.waveForm}>
          {recordingProcess ? (
            <Lottie
              source={require("../../../../../assets/soundwaves.json")}
              autoPlay
              loop
            />
          ) : listening ? (
            <Lottie
              source={require("../../../../../assets/soundwaves.json")}
              autoPlay
              loop
            />
          ) : null}
        </View>
        {recordingProcess ? (
          <TouchableOpacity
            onPress={() => {
              setListening(false);
              setRecordingProcess(false);
            }}
            style={{ alignSelf: "center" }}
          >
            <Ionicons name="ios-stop-circle-outline" size={68} color="black" />
          </TouchableOpacity>
        ) : (
          <>
            {!listening ? (
              <TouchableOpacity
                onPress={() => setListening(true)}
                style={styles.playbackIconContainer}
              >
                <Ionicons
                  name="ios-play-circle-outline"
                  size={68}
                  color="black"
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
                  color="black"
                />
              </TouchableOpacity>
            )}
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
