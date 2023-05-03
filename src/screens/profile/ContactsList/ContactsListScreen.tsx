import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import * as Contacts from "expo-contacts";
import { styles } from "./styles";
import Avatars from "../../../../components/avatars";
import { sendSMSAsync } from "expo-sms";
// import useAuth from "../../../hooks/useAuth";

const ContactsListScreen = () => {
  const [contacts, setContacts] = useState([]);

  // const { currentUser } = useAuth();
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const sendInvite = async (user) => {
    const { result } = await sendSMSAsync(
      [user.phoneNumbers[0].digits],
      `This new social app just came out for Uni students! https://instagram.com/scribe.app`
    );

    if (result === "sent") {
      Alert.alert("Invite sent!");
    } else if (result === "cancelled") {
      Alert.alert("Invite cancelled");
    } else if (result === "unknown") {
      Alert.alert("Invite sent!");
    } else {
      Alert.alert("Invite failed");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={(item) =>
          item.item.name ? (
            <TouchableOpacity
              onPress={() => sendInvite(item.item)}
              style={styles.contact}
            >
              <View style={styles.avatarName}>
                <Avatars name={item.item.name} />
                <Text style={styles.name}>{item.item.name}</Text>
              </View>
              <View style={styles.inviteButton}>
                <Text style={styles.inviteText}>INVITE</Text>
              </View>
            </TouchableOpacity>
          ) : item.item.nickname ? (
            <TouchableOpacity
              onPress={() => sendInvite(item.item)}
              style={styles.contact}
            >
              <View style={styles.avatarName}>
                <Avatars name={item.item.nickname} />
                <Text style={styles.name}>{item.item.nickname}</Text>
              </View>
              <View style={styles.inviteButton}>
                <Text style={styles.inviteText}>INVITE</Text>
              </View>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default ContactsListScreen;
