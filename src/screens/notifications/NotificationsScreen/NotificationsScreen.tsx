import React from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import NotificationItem from "../../../../components/NotificationItem";
import { colors } from "../../../../components/colors";

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text
        style={{
          fontFamily: "SFProRoundedHeavy",
          fontSize: 28,
          color: "rgba(112, 112, 112, 0.2)",
          textAlign: "center",
        }}
      >
        {" "}
        Work in progress ...{"\n"} nothing to see here yet
      </Text>
    </View>
  );
};

export default NotificationsScreen;

const notifications = [
  {
    id: 1,
    name: "Michael",
    username: "jordan",
    time: "3m",
    profilePic: require("../../../../assets/pic.jpg"),
    action: "Liked your post",
  },
  {
    id: 2,
    name: "Michael",
    username: "jordan",
    time: "5m",
    profilePic: require("../../../../assets/pic.jpg"),
    action: "Retweeted your post",
  },
  {
    id: 3,
    name: "Michael",
    username: "jordan",
    time: "12m",
    profilePic: require("../../../../assets/pic.jpg"),
    action: "Started following you",
  },
  {
    id: 4,
    name: "Michael",
    username: "jordan",
    time: "23m",
    profilePic: require("../../../../assets/pic.jpg"),
    action: "Liked your post",
  },
  {
    id: 5,
    name: "Michael",
    username: "jordan",
    time: "2h",
    profilePic: require("../../../../assets/pic.jpg"),
    action: "Commented on your post",
  },
];
