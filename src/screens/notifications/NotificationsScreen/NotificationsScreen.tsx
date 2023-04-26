import React from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import NotificationItem from "../../../../components/NotificationItem";

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={notifications}
        renderItem={(notification) => (
          <NotificationItem notification={notification} />
        )}
      />
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
