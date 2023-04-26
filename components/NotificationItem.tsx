import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesNotificationItem";

interface NotificationItemProps {
  notification: {
    index: number;
    item: {
      id: number;
      action: string;
      name: string;
      username: string;
      time: string;
      profilePic: any;
    };
  };
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.outerFlexRow}>
        <View style={styles.innerFlexRow}>
          <Image
            source={notification.item.profilePic}
            style={styles.profilePic}
          />
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{notification.item.name}</Text>
              <Text style={styles.username}>@{notification.item.username}</Text>
              <Text style={styles.timeText}>· {notification.item.time}</Text>
            </View>
            <Text style={styles.bodyText}>{notification.item.action}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
};

export default NotificationItem;
