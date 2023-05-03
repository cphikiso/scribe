import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import PostItem from "../../../../components/PostItem";
import { getFunctions, httpsCallable } from "firebase/functions";
import useAuth from "../../../hooks/useAuth";

const EveryoneScreen = () => {
  const { user, currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  console.log("user", user, "cureent user", currentUser, "current user");

  async function fetchAllPostsSortedByTime() {
    const functions = getFunctions();
    const getAllPostsSortedByTime = httpsCallable(
      functions,
      "getAllPostsSortedByTime"
    );

    try {
      const result = await getAllPostsSortedByTime();
      const allUserPosts = result.data.data;
      console.log("All user posts:", allUserPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        contentContainerStyle={{ paddingBottom: 74 }}
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={(post) => <PostItem post={post} />}
      />
    </View>
  );
};

export default EveryoneScreen;
