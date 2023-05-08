import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesPostItem";
import { Audio } from "expo-av";
import formatTimestamp from "../utils/formatTimestamp";
import { useNavigation } from "@react-navigation/core";
import { getLikeById, updateLike } from "../utils/posts";
import useAuth from "../src/hooks/useAuth";

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
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.item.data.likeCount,
  });

  const { currentUser } = useAuth();
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

  const navigation = useNavigation();

  useEffect(() => {
    getLikeById(
      post.item.data.postId,
      currentUser.uid,
      post.item.postCreator.uid
    ).then((res) => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      });
    });

    const focusSubscription = navigation.addListener("focus", () => {
      getLikeById(
        post.item.data.postId,
        currentUser.uid,
        post.item.postCreator.uid
      ).then((res) => {
        setCurrentLikeState({
          ...currentLikeState,
          state: res,
        });
      });
    });

    return focusSubscription;
  }, []);

  /**
   * Handles the like button action.
   *
   * In order to make the action more snappy the like action
   * is optimistic, meaning we don't wait for a response from the
   * server and always assume the write/delete action is successful
   */
  const handleUpdateLike = useMemo(
    () => (currentLikeStateInst) => {
      setCurrentLikeState({
        state: !currentLikeStateInst.state,
        counter:
          currentLikeStateInst.counter + (currentLikeStateInst.state ? -1 : 1),
      });
      updateLike(
        post.item.data.postId,
        currentUser.uid,
        post.item.postCreator.uid,
        currentLikeState
      );
    },
    [currentLikeState]
  );
  console.log("current like state", currentLikeState);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PostDetailed", { post: post.item });
      }}
      activeOpacity={0.9}
      style={styles.container}
    >
      <View style={styles.outerFlexRow}>
        <View style={styles.innerFlexRow}>
          <Image
            source={
              post.item.postCreator?.profilePicture
                ? { uri: post.item.postCreator?.profilePicture }
                : require("../assets/pic.png")
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
        <TouchableOpacity
          onPress={() => {
            handleUpdateLike(currentLikeState);
          }}
          style={styles.icon}
        >
          <Ionicons
            name={currentLikeState.state ? "ios-heart" : "ios-heart-outline"} //ios-heart is filled
            color={currentLikeState.state ? "red" : "rgba(60,60,67,0.6)"}
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
    </TouchableOpacity>
  );
};

export default PostItem;
