import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useRoute, useNavigation } from "@react-navigation/core";
import { styles } from "./styles";
import formatTimestamp from "../../../../utils/formatTimestamp";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const PostDetailedScreen = () => {
  const [playing, setPlaying] = useState(false);
  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { post } = params;

  console.log("post details", post);
  const time = formatTimestamp(post.data.time);

  const navigation = useNavigation();

  let sound;
  async function playSound() {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: post.data.audioURI },
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
              post.postCreator?.profilePicture
                ? { uri: post.postCreator?.profilePicture }
                : require("../../../../assets/pic.png")
            }
            style={styles.profilePic}
          />
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.name}>
                {post.postCreator.fullName || "NULL"}
              </Text>

              <Text style={styles.timeText}>· {time || "NULL"}</Text>
            </View>
            <Text style={styles.username}>
              @{post.postCreator.username || "NULL"}
            </Text>
            <Text style={styles.bodyText}>{post.data.body || "NULL"}</Text>
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
      {post.data.likesCount > 0 ? (
        <View style={styles.counterContainer}>
          <Text style={styles.number}>{post.data.likesCount}</Text>
          <Text style={styles.likeCount}>Likes</Text>
        </View>
      ) : null}
      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-chatbox-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.data.commentCount > 0 && post.data.commentCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-sync-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.data.reposts > 0 && post.data.reposts}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-heart-outline" //ios-heart-sharp is filled
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.data.likeCount > 0 && post.data.likeCount}
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

export default PostDetailedScreen;
