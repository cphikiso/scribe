import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostItem from "../../../../components/PostItem";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.listHeader}>
              <Image
                source={require("../../../../assets/pic.jpg")}
                style={styles.profilePic}
              />
              <View style={styles.nameBio}>
                <Text style={styles.name}>Chimwemwe</Text>
                <Text style={styles.bio}>a lil bio about me ...</Text>
              </View>
            </View>

            <View style={styles.followFollowing}>
              <TouchableOpacity>
                <Text style={styles.followText}>
                  0{" "}
                  <Text style={{ color: "rgba(60,60,67,0.3)" }}>Following</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.followText}>
                  0{" "}
                  <Text style={{ color: "rgba(60,60,67,0.3)" }}>Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inviteBorder} />
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteText}>Invite friends</Text>
            </TouchableOpacity>
            <View style={styles.inviteBorder} />
          </>
        )}
        data={posts}
        renderItem={(post) => <PostItem post={post} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;

const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
