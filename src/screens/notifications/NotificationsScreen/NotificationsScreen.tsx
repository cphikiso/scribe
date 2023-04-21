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
          <NotificationItem notification={notification.item} />
        )}
      />
    </View>
  );
};

export default NotificationsScreen;

const notifications = [
  { id: 1, action: "Liked your post" },
  { id: 2, action: "Retweeted your post" },
  { id: 3, action: "Started following you" },
  { id: 4, action: "Liked your post" },
  { id: 5, action: "Commented on your post" },
];
