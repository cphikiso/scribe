import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import formatTimestamp from "../../../../utils/formatTimestamp";

const CommentComponent = ({ comment }) => {
  const [commentCreator, setCommentCreator] = useState(null);

  const time = formatTimestamp(comment.item.timestamp);
  console.log("time", comment.item.timestamp, "converted time tooo", time);

  useEffect(() => {
    getDoc(doc(db, "users", comment.item.uid)).then((doc) => {
      if (doc.exists()) {
        console.log("Document data:", doc.data());
        setCommentCreator(doc.data());
        console.log("commentCreator", commentCreator);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, []);

  console.log("comment", comment.item);

  return (
    <View style={styles.commentContainer}>
      <View style={styles.outerFlexRow}>
        <View style={styles.innerFlexRow}>
          <Image
            source={
              commentCreator?.profilePicture
                ? {
                    uri: commentCreator?.profilePicture,
                  }
                : require("../../../../assets/pic.png")
            }
            style={styles.profilePic}
          />
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.name}>
                {commentCreator?.fullName || "NULL"}
              </Text>

              <Text style={styles.timeText}>· {time || "NULL"}</Text>
            </View>
            <Text style={styles.username}>
              @{commentCreator?.username || "NULL"}
            </Text>
            <Text style={styles.bodyText}>
              {comment.item.comment || "NULL"}
            </Text>
          </View>
        </View>
      </View>
      {comment.item.likesCount > 0 ? (
        <View style={styles.counterContainer}>
          <Text style={styles.number}>{comment.item.data.likesCount}</Text>
          <Text style={styles.likeCount}>Likes</Text>
        </View>
      ) : null}
      {/* <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-chatbox-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {comment.item?.commentCount > 0 && comment.item?.commentCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-sync-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {comment.item?.recomments > 0 && comment.item?.recomments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-heart-outline" //ios-heart-sharp is filled
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
          <Text style={styles.actionText}>
            {comment.item?.likeCount > 0 && comment.item?.likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons
            name="ios-ellipsis-horizontal"
            color={"rgba(60,60,67,0.3)"}
            size={24}
          />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#F5F5F5",
        }}
      />
    </View>
  );
};

export default CommentComponent;
