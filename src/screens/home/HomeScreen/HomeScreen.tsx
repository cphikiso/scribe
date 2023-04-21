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

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
                  console.log("press");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeader}>New Post</Text>

              <Text style={styles.timerText}>00:04.59</Text>
              <View style={{ paddingHorizontal: 16, height: 200 }}>
                <Lottie
                  source={require("../../../../assets/soundwaves.json")}
                  autoPlay
                  loop
                />
              </View>
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Ionicons
                  name="ios-stop-circle-outline"
                  size={68}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.plusCircle}
        onPress={() => {
          setModalVisible(true);
          console.log("press");
        }}
      >
        <AntDesign name="pluscircle" size={44} color="black" />
      </TouchableOpacity>

      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

export default HomeScreen;
