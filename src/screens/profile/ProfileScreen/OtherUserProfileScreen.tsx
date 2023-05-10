import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostItem from "../../../../components/PostItem";
import useAuth from "../../../hooks/useAuth";
import { getFunctions, httpsCallable } from "firebase/functions";
import CurrentUserPostItem from "../../../../components/CurrentUserPostItem";
import { getDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/core";
import OtherUserPostItem from "../../../../components/OtherUserPostItem";

const OtherUserProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { user, currentUser } = useAuth();

  const { params } = useRoute();

  const { profileOwner } = params;

  console.log("user", user, "cureent user", currentUser, "current user");

  console.log("profile owner", profileOwner);

  const functions = getFunctions();

  async function fetchCurrentUserPosts() {
    try {
      const uid = profileOwner.uid;
      const getCurrentUserPosts = httpsCallable(
        functions,
        "getCurrentUserPosts"
      );
      const response = await getCurrentUserPosts({ uid });
      const userPosts = response.data.userPosts;
      setPosts(userPosts);
      console.log("User posts:", userPosts);
    } catch (error) {
      console.error("Error fetching current user posts:", error);
    }
  }

  useEffect(() => {
    fetchCurrentUserPosts();
  }, []);

  async function fetchNewPosts() {
    await fetchCurrentUserPosts();
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNewPosts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.listHeader}>
              <Image
                source={
                  profileOwner?.profilePicture
                    ? { uri: profileOwner?.profilePicture }
                    : require("../../../../assets/pic.png")
                }
                style={styles.profilePic}
              />
              <View style={styles.nameBio}>
                <Text style={styles.name}>{profileOwner.fullName}</Text>
                <View style={styles.bioContainer}>
                  <Text numberOfLines={4} style={styles.bio}>
                    {profileOwner?.bio || "your bio will be here"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.inviteBorder} />
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteText}>Follow</Text>
            </TouchableOpacity>
            <View style={styles.inviteBorder} />
          </>
        )}
        data={posts}
        renderItem={(post) => (
          <OtherUserPostItem otherUser={profileOwner} post={post} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>Create your first post</Text>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default OtherUserProfileScreen;
