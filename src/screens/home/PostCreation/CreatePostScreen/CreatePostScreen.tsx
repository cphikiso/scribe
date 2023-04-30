import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
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

const CreatePostScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [recordingProcess, setRecordingProcess] = useState(true);
  const [listening, setListening] = useState(false);
  const [uploadAudio, setUploadAudio] = useState(false);

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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  return (
    <View style={styles.modal}>
      <View style={styles.seeThrough}>
        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedback}
          onPress={() => navigation.goBack()}
        />
      </View>
      <GestureDetector gesture={panGesture}>
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
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("../../../../../assets/appIcons/close.png")}
                style={{ height: 28, width: 28 }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.largeTimerText}>00:04.59</Text>

          {recordingProcess ? (
            <TouchableOpacity
              onPress={() => {
                setListening(false);
                setRecordingProcess(false);
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
                    onPress={() => {
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
              <TouchableOpacity
                onPress={() => {
                  setUploadAudio(true);
                  navigation.navigate("Transcribe");
                }}
                style={styles.modalButton}
              >
                <Text style={styles.buttonText}>Transcribe</Text>
                {/* Start scribing */}
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default CreatePostScreen;
