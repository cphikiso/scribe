/**
 * Gets the like state of a user in a specific post
 * @param {String} postId - id of the post
 * @param {String} uid - id of the user to get the like state of.
 *
 * @returns {Promise<Boolean>} true if user likes it and vice versa.
 */

import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getLikeById = (postId, currentUserId, postCreatorId) =>
  new Promise(async (resolve, reject) => {
    const ref = doc(
      db,
      "posts",
      postCreatorId,
      "userPosts",
      postId,
      "likes",
      currentUserId
    );
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      resolve(true);
    } else {
      resolve(false);
    }
  });

// export const getLikeById = (postId, uid) =>
//   new Promise((resolve, reject) => {
//     firestore()
//       .collection("posts")
//       .doc(postId)
//       .collection("likes")
//       .doc(uid)
//       .get()
//       .then((res) => resolve(res.exists));
//   });

/**
 * Updates the like of a post according to the current user's id
 * @param {String} postId - id of the post
 * @param {String} uid - id of the user to get the like state of.
 * @param {Boolean} currentLikeState - true if the user likes the post and vice versa.
 */
export const updateLike = (
  postId,
  currentUserId,
  postCreatorId,
  currentLikeState
) => {
  if (currentLikeState.state == true) {
    console.log("run action", currentLikeState.state);
    deleteDoc(
      doc(
        db,
        "posts",
        postCreatorId,
        "userPosts",
        postId,
        "likes",
        currentUserId
      )
    );
  } else {
    console.log("set doc", currentLikeState);
    setDoc(
      doc(
        db,
        "posts",
        postCreatorId,
        "userPosts",
        postId,
        "likes",
        currentUserId
      ),
      {}
    );
  }
};
