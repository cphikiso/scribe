import React, { useCallback, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import PostItem from "../../../../components/PostItem";
import useAuth from "../../../hooks/useAuth";

const HomeScreen = () => {
  const { user, currentUser } = useAuth();

  console.log("user", user, "cureent user", currentUser, "current user");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        contentContainerStyle={{ paddingBottom: 74 }}
        keyExtractor={(post) => post.id.toString()}
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={(post) => <PostItem post={post} />}
      />
    </View>
  );
};

export default HomeScreen;

const posts = [
  {
    id: 1,
    userName: "laflame",
    name: "Travis Scott",
    time: "2m",
    body: "these aren’t just random questions. they reveal (and motivate) some key design decisions. for each of these, what do you *want* the answer to be, and why? what is the “price” of your chosen answer?",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 10,
    reposts: 20,
    likes: 30,
  },
  {
    id: 2,
    userName: "jordan",
    name: "Michael Jordan",
    time: "5m",
    body: "Game 6 went cray fr",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 23,
    reposts: 200,
    likes: 800,
  },
  {
    id: 3,
    userName: "pippen",
    name: "Scottie Pippen",
    time: "30m",
    body: "Y'all need to stop comparing me to Draymond Green. I can actually score ... ",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 111,
    reposts: 4,
    likes: 45,
  },
  {
    id: 31,
    userName: "laflame",
    name: "Travis Scott",
    time: "1h",
    body: "these aren’t just random questions. they reveal (and motivate) some key design decisions. for each of these, what do you *want* the answer to be, and why? what is the “price” of your chosen answer?",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 10,
    reposts: 20,
    likes: 30,
  },
  {
    id: 41,
    userName: "finkd",
    name: "Mark",
    time: "2h",
    body: "what's the addy?",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 2,
    reposts: 14,
    likes: 33,
  },
];
