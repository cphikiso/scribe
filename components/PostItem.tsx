import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./stylesPostItem";

interface PostItemProps {
  post: {
    index: number;
    item: {
      id: number;
      userName: string;
      name: string;
      time: string;
      body: string;
      profilePic: any;
      audio: string;
      comments: number;
      reposts: number;
      likes: number;
    };
  };
}

const PostItem = ({ post }: PostItemProps) => {
  console.log("post", post);
  return (
    <View style={styles.container}>
      <View style={styles.outerFlexRow}>
        <View style={styles.innerFlexRow}>
          <Image source={post.item.profilePic} style={styles.profilePic} />
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{post.item.name}</Text>
              <Text style={styles.username}>@{post.item.userName}</Text>
              <Text style={styles.timeText}>· {post.item.time}</Text>
            </View>
            <Text style={styles.bodyText}>{post.item.body}</Text>
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
          <Text style={styles.actionText}>
            {post.item.comments > 0 && post.item.comments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-sync-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.item.reposts > 0 && post.item.reposts}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-heart-outline" //ios-heart-sharp is filled
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {post.item.likes > 0 && post.item.likes}
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
