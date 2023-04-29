import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostItem from "../../../../components/PostItem";

const ProfileScreen = ({ navigation }) => {
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Contacts")}
              style={styles.inviteButton}
            >
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

const posts = [
  {
    id: 1,
    userName: "laflame",
    name: "Travis Scott",
    time: "2m",
    body: "these aren’t just random questions",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 10,
    reposts: 20,
    likes: 30,
  },
  {
    id: 2,
    userName: "laflame",
    name: "Travis Scott",
    time: "5m",
    body: "just random",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 0,
    reposts: 0,
    likes: 1,
  },
  {
    id: 3,
    userName: "laflame",
    name: "Travis Scott",
    time: "30m",
    body: "these aren’t just random questions. they reveal (and motivate) some key design decisions. for each of these, what do you *want* the answer to be, and why? what is the “price” of your chosen answer?",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 10,
    reposts: 20,
    likes: 30,
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
    userName: "laflame",
    name: "Travis Scott",
    time: "2h",
    body: "these aren’t just random questions. they reveal (and motivate) some key design decisions. for each of these, what do you *want* the answer to be, and why? what is the “price” of your chosen answer?",
    profilePic: require("../../../../assets/pic.jpg"),
    audio: "audio.mp3",
    comments: 10,
    reposts: 20,
    likes: 30,
  },
];
