import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../../../components/colors";
import { CountryItem, countryCodes } from "../../../../../components/Countries";
import { FadeInRight, SlideOutRight } from "react-native-reanimated";
import useAuth from "../../../../hooks/useAuth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../../firebaseConfig";
import firebase from "firebase/compat/app";

const EnterPhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+44");
  const [countryFlag, setCountryFlag] = useState<string>("🇬🇧");
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);

  const [codeNumber, setCodeNumber] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const [verificationId, setVerificationId] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState("");

  const recaptchaVerifierObject = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("response", response);
        // onSignInSubmit();
      },
    },
    auth
  );

  const appVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );

  // const recaptchaVerifier = useRef(null);

  // const sendVerification = async () => {
  //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //   phoneProvider
  //     .verifyPhoneNumber(codeNumber, recaptchaVerifier.current)
  //     .then(setVerificationId);
  //   console.log("verificationId", verificationId);
  //   setCodeNumber("");
  // };

  // const confirmCodeFunction = async () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(
  //     verificationId,
  //     confirmationCode
  //   );
  //   firebase.auth().signInWithCredential(credential);
  //   setConfirmationCode("");
  //   Alert.alert("Phone authentication successful 👍");
  // };

  // const { phoneSignUp } = useAuth();

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
      <StatusBar style="light" />
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app}
      /> */}

      <Modal style={{ flex: 1 }} transparent={true} visible={showCountryPicker}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
          data={countryCodes}
          renderItem={({
            item,
            index,
          }: {
            item: CountryItem;
            index: number;
          }) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCountryCode(item?.dial_code);
                setCountryFlag(item?.flag);
                setShowCountryPicker(false);
              }}
              style={styles.countryListContainer}
            >
              <View style={styles.textsRow}>
                <Text
                  style={{ textAlign: "center", fontSize: 24, marginRight: 16 }}
                >
                  {item?.flag}
                </Text>
                <Text style={styles.name}>{item?.dial_code}</Text>

                <Text
                  style={[
                    styles.name,
                    {
                      position: "absolute",
                      left: "25%",
                    },
                  ]}
                >
                  {item?.name["en"]}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              />
            </TouchableOpacity>
          )}
        />
      </Modal>
      <Modal style={{ flex: 1 }} transparent={true} visible={confirmModal}>
        <View
          style={{
            backgroundColor: "rgba(0, 0,0, 0.6)",
            flex: 1,
          }}
        >
          <View style={styles.seeThrough}>
            <TouchableWithoutFeedback
              style={styles.touchableWithoutFeedback}
              onPress={() => setConfirmModal(false)}
            >
              <View style={styles.touchableWithoutFeedback} />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.bottomSheet}>
            <View style={styles.headerModal}>
              <TouchableOpacity
                style={styles.cancel}
                hitSlop={{ top: 44, bottom: 44, left: 44, right: 44 }}
                onPress={() => setConfirmModal(false)}
              >
                <Image
                  source={require("../../../../../assets/appIcons/close.png")}
                  style={{ height: 28, width: 28 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.confirmContainer}>
              <Text style={styles.confirmText}>
                thanks! we'll send a {"\n"}verification code to: {"\n"}{" "}
                <Text style={{ color: colors.purple }}>{codeNumber}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                signInWithPhoneNumber(auth, codeNumber, appVerifier)
                  .then((confirmationResult) => {
                    setConfirmationCode(confirmationResult);
                  })
                  .catch((error) => {
                    console.log("signInError", error);
                  });
              }} //; navigation.navigate("EnterCodeScreen");
              style={styles.modalButton}
            >
              <Text style={[styles.buttonText, { color: "#FFF" }]}>okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.numberContainer}>
        <TouchableOpacity
          onPress={() => setShowCountryPicker(true)}
          style={styles.pickerContainer}
        >
          <Text style={[styles.pickerText, { marginRight: 8 }]}>
            {countryFlag}
          </Text>
          <Text style={styles.pickerText}>{countryCode}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="1234 56789"
          placeholderTextColor={"rgba(255,255,255,0.5)"}
          autoCorrect={false}
          value={phoneNumber}
          inputMode="numeric"
          keyboardType="phone-pad"
          autoComplete="cc-number"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          autoFocus={true}
          cursorColor="#FFF"
          selectionColor={"#FFF"}
          maxLength={18}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,

          paddingTop: Platform.OS === "android" ? "70%" : "60%",
          paddingVertical: 16,
        }}
        //keyboardVerticalOffset={10}
      >
        {confirmModal ? null : (
          <TouchableOpacity
            disabled={phoneNumber.length !== 10 && phoneNumber.length !== 6}
            onPress={() => {
              setCodeNumber(countryCode + phoneNumber);

              setConfirmModal(true);
            }}
            style={[
              styles.nextButton,
              {
                backgroundColor:
                  phoneNumber.length == 10 || phoneNumber.length == 6
                    ? "#FFF"
                    : "rgba(255, 255, 255, 0.5)",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    phoneNumber.length == 10 || phoneNumber.length == 6
                      ? colors.purple
                      : colors.purpl30,
                },
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EnterPhoneNumberScreen;
