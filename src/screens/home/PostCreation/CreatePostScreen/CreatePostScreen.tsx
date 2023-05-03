import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { styles } from "./styles";
import Lottie from "lottie-react-native";
import { Audio } from "expo-av";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../../components/colors";
import Animated, {
  Easing,
  FadeInRight,
  SlideInRight,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
import useAuth from "../../../../hooks/useAuth";
import uuid from "react-native-uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const CreatePostScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [recordingProcess, setRecordingProcess] = useState(false);
  const [listening, setListening] = useState(false);
  const [uploadAudio, setUploadAudio] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);
  const [audioURI, setAudioURI] = useState(null);

  const [recordingDuration, setRecordingDuration] = useState(null);
  const { currentUser } = useAuth();

  async function uploadAudioAsync(uri) {
    // Upload the local audio file to Firebase Storage
    const audioBlob = await fetch(uri).then((response) => response.blob());
    const audioRef = ref(getStorage(), `audios/${uuid.v4()}.m4a`);
    await uploadBytes(audioRef, audioBlob);

    // Get the Firebase Storage path of the uploaded audio file
    const firebaseStoragePath = audioRef.fullPath;
    // Initialize the Firebase Functions and the callable function
    const functions = getFunctions();
    const convertAudioToMp3 = httpsCallable(functions, "convertAudioToMp3");

    // Call the Firebase Function to convert the audio file to MP3 format
    const sourceFile = firebaseStoragePath;
    const targetFile = await convertAudioToMp3({ sourceFile });

    // Get the download URL of the converted file from the Firebase Function's response
    const url = targetFile.data;
    // Log the URL and navigate to the Transcribe screen with the new audio file's URL
    navigation.navigate("Transcribe", {
      audioURI: url,
      audioDuration: recordingDuration,
    });
  }

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording, status, sound } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          setRecordingDuration(getDurationFormatted(status.durationMillis));
        }
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const status = recording;
    const uri = recording.getURI();
    setAudioRecording(uri);
  }

  let sound; // Declare sound variable in the outer scope

  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioRecording },
      { shouldPlay: true }
    );
    sound = newSound; // Assign the sound object to the outer scope variable

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isPlaying && status.didJustFinish) {
        setListening(false);
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
  {
    /* 
  const END_POSITION = 400;
  const onDown = useSharedValue(true);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onDown.value) {
        position.value = e.translationY;
      } else {
        position.value = END_POSITION + e.translationY;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onDown.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onDown.value = true;
      }
    });

*/
  }

  const position = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = (minutes - minutesDisplay) * 60;
    const secondsDisplay =
      seconds < 10 ? `0${seconds.toFixed(2)}` : seconds.toFixed(2);
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  return (
    <View style={styles.modal}>
      <View style={styles.seeThrough}>
        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedback}
          onPress={() => {
            recordingProcess ? stopRecording() : null;
            navigation.goBack();
          }}
        />
      </View>
      {/* <GestureDetector gesture={panGesture}> */}
      <Animated.View
        entering={FadeInRight}
        exiting={SlideOutRight.delay(20)}
        style={[styles.bottomSheet, animatedStyle]}
      >
        <View style={styles.headerModal}>
          <Text style={{ color: colors.purple }}>nulls</Text>
          <Text style={styles.modalHeader}>Recording</Text>
          <TouchableOpacity
            style={styles.cancel}
            hitSlop={{ top: 44, bottom: 44, left: 44, right: 44 }}
            onPress={() => {
              recordingProcess ? stopRecording() : null;
              navigation.goBack();
            }}
          >
            <Image
              source={require("../../../../../assets/appIcons/close.png")}
              style={{ height: 28, width: 28 }}
            />
          </TouchableOpacity>
        </View>

        {uploadAudio ? (
          <View style={{ paddingTop: 16 }}>
            <ActivityIndicator size={"large"} color={"#FFF"} />
            <Text
              style={[styles.largeTimerText, { fontSize: 18, paddingTop: 28 }]}
            >
              processing ...
            </Text>
          </View>
        ) : (
          <>
            <Animated.Text style={styles.largeTimerText}>
              {recordingDuration ? recordingDuration : "00:00:00"}
            </Animated.Text>
            {recordingProcess ? (
              <TouchableOpacity
                onPress={() => {
                  setListening(false);
                  setRecordingProcess(false);
                  stopRecording();
                }}
                style={{ alignSelf: "center" }}
              >
                <Ionicons
                  name="ios-stop-circle-outline"
                  size={68}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              <>
                <View>
                  {!listening ? (
                    audioRecording ? (
                      <TouchableOpacity
                        onPress={() => {
                          playSound();
                          setListening(true);
                        }}
                        style={styles.playbackIconContainer}
                      >
                        <Ionicons
                          name="ios-play-circle-outline"
                          size={68}
                          color="white"
                        />
                      </TouchableOpacity>
                    ) : null
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        stopSound();
                        setListening(false);
                      }}
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
                {audioRecording ? (
                  <TouchableOpacity
                    onPress={() => {
                      setUploadAudio(true);
                      uploadAudioAsync(audioRecording);
                    }}
                    style={styles.modalButton}
                  >
                    <Text style={styles.buttonText}>Transcribe</Text>
                    {/* Start scribing */}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      startRecording();
                      setRecordingProcess(true);
                    }}
                    style={styles.modalButton}
                  >
                    <Text style={styles.buttonText}>Start recording</Text>
                    {/* Start scribing */}
                  </TouchableOpacity>
                )}
              </>
            )}
          </>
        )}
      </Animated.View>
      {/* </GestureDetector> */}
    </View>
  );
};

export default CreatePostScreen;
