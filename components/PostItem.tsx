import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesPostItem";
import { Audio } from "expo-av";
import formatTimestamp from "../utils/formatTimestamp";

interface PostItemProps {
  post: {
    index: number;
    item: {
      id: number;
      userName: string;
      name: string;
      time: string;
      body: string;
      profilePicture: any;
      audioURI: string;
      comments: object[];
      commentCount: number;
      reposts: number;
      likes: object[];
      likeCount: number;
    };
  };
}

const PostItem = ({ post }: PostItemProps) => {
  const [playing, setPlaying] = useState(false);

  console.log("post is here", post.item.data.time);
  const time = formatTimestamp(post.item.data.time);
  let sound;
  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: post.item.data.audioURI },
      { shouldPlay: true }
    );
    sound = newSound;

    setPlaying(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isPlaying && status.didJustFinish) {
        setPlaying(false);
      }
    });

    await sound.playAsync();
  }

  function stopSound() {
    if (sound) {
      sound.stopAsync();
      setPlaying(false);
    } else {
      null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.outerFlexRow}>
        <View style={styles.innerFlexRow}>
          <Image
            source={
              post.item.postCreator.profilePicture ||
              require("../assets/pic.jpg")
            }
            style={styles.profilePic}
          />
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.name}>
                {post.item.postCreator.fullName || "NULL"}
              </Text>
              <Text style={styles.username}>
                @{post.item.postCreator.username || "NULL"}
              </Text>
              <Text style={styles.timeText}>· {time || "NULL"}</Text>
            </View>
            <Text style={styles.bodyText}>{post.item.data.body || "NULL"}</Text>
          </View>
        </View>
        {playing ? (
          <TouchableOpacity
            onPress={() => {
              stopSound();
            }}
            style={styles.playAudioButton}
          >
            <Ionicons name="ios-stop" size={24} color={"rgba(60,60,67,0.6)"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              playSound();
            }}
            style={styles.playAudioButton}
          >
            <Ionicons name="ios-play" size={24} color={"rgba(60,60,67,0.6)"} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-chatbox-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.item.data.commentCount > 0 && post.item.data.commentCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-sync-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.item.data.reposts > 0 && post.item.data.reposts}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-heart-outline" //ios-heart-sharp is filled
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.item.data.likeCount > 0 && post.item.data.likeCount}
          </Text>
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
