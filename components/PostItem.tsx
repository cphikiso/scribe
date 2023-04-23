import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesPostItem";

const PostItem = ({ post }) => {
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
            <Text style={styles.bodyText}>
              these aren’t just random questions. they reveal (and motivate)
              some key design decisions. for each of these, what do you *want*
              the answer to be, and why? what is the “price” of your chosen
              answer?
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.playAudioButton}>
          <Ionicons name="ios-play" size={24} color={"rgba(60,60,67,0.6)"} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-chatbox-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-sync-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-heart-outline" //ios-heart-sharp is filled
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-ellipsis-horizontal"
            color={"rgba(60,60,67,0.3)"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: "#F5F5F5" }} />
    </View>
  );
};

export default PostItem;
