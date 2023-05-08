import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useRoute, useNavigation } from "@react-navigation/core";
import { styles } from "./styles";
import formatTimestamp from "../../../../utils/formatTimestamp";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../components/colors";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import uuid from "react-native-uuid";
import CommentComponent from "./CommentComponent";

const PostDetailedScreen = () => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [playing, setPlaying] = useState(false);

  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { post } = params;

  console.log("post details", post);
  const time = formatTimestamp(post.data.time);
  console.log("post OG TIME", post.data.time, "post time", time);
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

  function dismissKeyboard() {
    if (Platform.OS != "web") {
      Keyboard.dismiss();
    }
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(
            db,
            "posts",
            post.postCreator.uid,
            "userPosts",
            post.data.postId,
            "comments"
          ),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        }
      ),
    [db, post]
  );

  const sendComment = () => {
    const commentId = `${uuid.v4()}`;
    addDoc(
      collection(
        db,
        "posts",
        post.postCreator.uid,
        "userPosts",
        post.data.postId,
        "comments"
      ),
      {
        timestamp: serverTimestamp(),
        uid: currentUser?.uid,
        comment: input,
        likeCount: 0,
        likes: [],
        replyCount: 0,
        replies: [],
        responseTo: post.data.postId,
        userRespondingTo: post.postCreator.uid,
      }
    );
    setInput("");
  };

  let commentCreator: string;

  console.log("comments ARRAY", comments);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
      >
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
          <FlatList
            ListHeaderComponent={() => (
              <View style={styles.postContainer}>
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
                      <Text style={styles.bodyText}>
                        {post.data.body || "NULL"}
                      </Text>
                    </View>
                  </View>
                  {playing ? (
                    <TouchableOpacity
                      onPress={() => {
                        stopSound();
                      }}
                      style={styles.playAudioButton}
                    >
                      <Ionicons
                        name="ios-stop"
                        size={24}
                        color={"rgba(60,60,67,0.6)"}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        playSound();
                      }}
                      style={styles.playAudioButton}
                    >
                      <Ionicons
                        name="ios-play"
                        size={24}
                        color={"rgba(60,60,67,0.6)"}
                      />
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
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#F5F5F5",
                  }}
                />
              </View>
            )}
            data={comments}
            renderItem={(comment) => <CommentComponent comment={comment} />}
            showsVerticalScrollIndicator={false}
          />
        </TouchableWithoutFeedback>
        <View style={styles.commentInputContainer}>
          <TextInput
            selectionColor={colors.purple}
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendComment}
            multiline={true}
          />
          <Button color={colors.purple} onPress={sendComment} title="Send" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostDetailedScreen;
