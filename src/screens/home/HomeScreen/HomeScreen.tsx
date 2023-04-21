import React, { useCallback, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
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
            <View style={styles.touchableWF}></View>
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
              <View style={styles.waveForm}>
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", maxWidth: "80%" }}>
          <Image
            source={require("../../../../assets/pic.jpg")}
            style={{ height: 44, width: 44, borderRadius: 44, marginRight: 12 }}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#000",
                  marginRight: 4,
                  fontFamily: "SFProRoundedBold",
                  marginBottom: 4,
                  fontSize: 16,
                }}
              >
                Travis Scott
              </Text>
              <Text
                style={{
                  color: "rgba(60,60,67, 0.6)",
                  fontFamily: "SFProRoundedMedium",
                  fontSize: 16,
                  marginRight: 4,
                }}
              >
                @laflame
              </Text>
              <View
                style={{
                  height: 2,
                  width: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(60,60,67,0.6)",
                  marginRight: 4,
                }}
              />
              <Text
                style={{
                  color: "rgba(60,60,67, 0.6)",
                  fontFamily: "SFProRoundedMedium",
                  fontSize: 16,
                }}
              >
                2m
              </Text>
            </View>
            <Text
              style={{
                color: "rgb(60,60,67)",
                fontFamily: "SFProRoundedMedium",
                fontSize: 16,
              }}
            >
              these aren’t just random questions. they reveal (and motivate)
              some key design decisions. for each of these, what do you *want*
              the answer to be, and why? what is the “price” of your chosen
              answer?
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            top: -16,
            height: 44,
            width: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-play" size={24} color={"rgba(60,60,67,0.6)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
