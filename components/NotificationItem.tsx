import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesNotificationItem";

const NotificationItem = ({ notification }) => {
  return (
    <View style={styles.container}>
      <View style={styles.outerFlexRow}>
        <View style={styles.innerFlexRow}>
          <Image
            source={require("../assets/pic.jpg")}
            style={styles.profilePic}
          />
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.name}>Travis Scott</Text>
              <Text style={styles.username}>@laflame</Text>
              <View style={styles.dot} />
              <Text style={styles.timeText}>2m</Text>
            </View>
            <Text style={styles.bodyText}>{notification.action}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
};

export default NotificationItem;
