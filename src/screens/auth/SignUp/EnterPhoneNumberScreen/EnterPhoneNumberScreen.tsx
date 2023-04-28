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
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../../../components/colors";
import { CountryItem, countryCodes } from "../../../../../components/Countries";

const EnterPhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+44");
  const [countryFlag, setCountryFlag] = useState<string>("🇬🇧");
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);

  const [codeNumber, setCodeNumber] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} style={styles.container}>
      <StatusBar style="light" />

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
      <Modal
        style={{ flex: 1 }}
        transparent={true}
        visible={confirmModal}
      ></Modal>
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
        <TouchableOpacity
          disabled={phoneNumber.length <= 7}
          onPress={() => {
            //   updateFirstName();
            navigation.navigate("ConfirmationCode");
          }}
          style={[
            styles.nextButton,
            {
              backgroundColor:
                phoneNumber.length > 7 ? "#FFF" : "rgba(255, 255, 255, 0.5)",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: phoneNumber.length > 7 ? colors.purple : colors.purpl30,
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EnterPhoneNumberScreen;
