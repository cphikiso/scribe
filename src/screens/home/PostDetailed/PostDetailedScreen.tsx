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
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import uuid from "react-native-uuid";
import CommentComponent from "./CommentComponent";
import { getLikeById, updateLike } from "../../../../utils/posts";
import { useActionSheet } from "@expo/react-native-action-sheet";

const PostDetailedScreen = () => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [playing, setPlaying] = useState(false);

  const { currentUser } = useAuth();
  const { params } = useRoute();
  const { post } = params;

  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.data.likeCount,
  });
  const [likeCount, setLikeCount] = useState(post.data.likeCount);
  const [commentCount, setCommentCount] = useState(post.data.commentCount);

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

  useEffect(() => {
    getLikeById(post.data.postId, currentUser.uid, post.postCreator.uid).then(
      (res) => {
        setCurrentLikeState({
          ...currentLikeState,
          state: res,
        });
      }
    );

    const focusSubscription = navigation.addListener("focus", () => {
      getLikeById(post.data.postId, currentUser.uid, post.postCreator.uid).then(
        (res) => {
          setCurrentLikeState({
            ...currentLikeState,
            state: res,
          });
        }
      );
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
        post.data.postId,
        currentUser.uid,
        post.postCreator.uid,
        currentLikeState
      );
    },
    [currentLikeState]
  );

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

  const { showActionSheetWithOptions } = useActionSheet();

  const onPressCurrentUserEllipsis = () => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === destructiveButtonIndex) {
          console.log("Delete");
          deleteDoc(
            doc(
              db,
              "posts",
              post.item.postCreator.uid,
              "userPosts",
              post.item.data.postId
            )
          ).then(() => {
            Alert.alert("Post deleted");
          });
        } else if (buttonIndex === cancelButtonIndex) {
          console.log("Cancel");
        }
      }
    );
  };
  const onPressGeneralUserEllipsis = () => {
    const options = ["Report", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === destructiveButtonIndex) {
          console.log("Report");
          setDoc(doc(db, "reports", post.item.data.postId), {
            postData: post.item.data,
            postCreator: post.item.postCreator,
            reporter: currentUser,
            timestamp: serverTimestamp(),
          });
        } else if (buttonIndex === cancelButtonIndex) {
          console.log("Cancel");
        }
      }
    );
  };

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
                  <TouchableOpacity
                    onPress={() => {
                      handleUpdateLike(currentLikeState);
                    }}
                    style={styles.icon}
                  >
                    <Ionicons
                      name={
                        currentLikeState.state
                          ? "ios-heart"
                          : "ios-heart-outline"
                      } //ios-heart-sharp is filled
                      color={
                        currentLikeState.state ? "red" : "rgba(60,60,67,0.6)"
                      }
                      size={24}
                    />
                    <Text style={styles.actionText}>
                      {post.data.likeCount > 0 && post.data.likeCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={
                      currentUser.uid === post.data.uid
                        ? onPressCurrentUserEllipsis
                        : onPressGeneralUserEllipsis
                    }
                    style={styles.icon}
                  >
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
