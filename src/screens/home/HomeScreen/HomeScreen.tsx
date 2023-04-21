import React, { useCallback, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import Lottie from "lottie-react-native";
import { Audio } from "expo-av";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recording, setRecording] = useState();
  const [recordingProcess, setRecordingProcess] = useState(false);
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

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["35%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{ flex: 1, width: "100%" }}></View>
          </TouchableWithoutFeedback>
          <BottomSheet
            detached={true}
            bottomInset={46}
            style={styles.bottomSheet}
            onClose={() => setModalVisible(false)}
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.modalContentContainer}>
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
              <View style={{ paddingHorizontal: 16, height: 160 }}>
                {recordingProcess || listening ? (
                  <Lottie
                    source={require("../../../../assets/soundwaves.json")}
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
                  <Ionicons
                    name="ios-stop-circle-outline"
                    size={68}
                    color="black"
                  />
                </TouchableOpacity>
              ) : (
                <>
                  {!listening ? (
                    <TouchableOpacity
                      onPress={() => setListening(true)}
                      style={{ alignSelf: "center", marginBottom: 28 }}
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
                      style={{ alignSelf: "center", marginBottom: 28 }}
                    >
                      <Ionicons
                        name="ios-pause-circle-outline"
                        size={68}
                        color="black"
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      backgroundColor: "#000",
                      height: 58,
                      borderRadius: 44,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontFamily: "SFProRoundedHeavy",
                      }}
                    >
                      Start scribing{" "}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </BottomSheet>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.plusCircle}
        onPress={() => {
          setModalVisible(true);
          setRecordingProcess(true);
        }}
      >
        <AntDesign name="pluscircle" size={44} color="black" />
      </TouchableOpacity>

      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

export default HomeScreen;
