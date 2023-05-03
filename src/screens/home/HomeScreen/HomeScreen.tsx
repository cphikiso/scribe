import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import PostItem from "../../../../components/PostItem";
import useAuth from "../../../hooks/useAuth";
import { getFunctions, httpsCallable } from "firebase/functions";
const HomeScreen = () => {
  const { user, currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchAllPostsSortedByTime(afterTimestamp = null) {
    const functions = getFunctions();
    const getAllPostsSortedByTime = httpsCallable(
      functions,
      "getAllPostsSortedByTime"
    );

    try {
      await getAllPostsSortedByTime({ afterTimestamp }).then((res) => {
        if (afterTimestamp) {
          setPosts((prevPosts) => [...res.data.data, ...prevPosts]);
        } else {
          setPosts(res.data.data);
        }
        console.log("All user posts:", res.data.data);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function fetchNewPosts() {
    if (posts.length > 0) {
      const latestTimestamp = posts[0].data.time;
      await fetchAllPostsSortedByTime(latestTimestamp);
    } else {
      await fetchAllPostsSortedByTime();
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNewPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAllPostsSortedByTime();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
