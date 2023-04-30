import { View, Text, Alert } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  PhoneAuthProvider,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const storeUserCredentials = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveUserCredentials = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserCredentials = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  // direct useEffect return means authStateChange implicitly unsubscribes
  useEffect(() => {
    retrieveUserCredentials();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoadingInitial(false);
    });

    return unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCurrentUser(docSnap.data());
      } else {
        Alert.alert("Error", "User not found");
      }
    });

    return () => {
      unsubscribe;
    };
  }, [user]);

  const emailSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authenticatedUser) => {
        setUser(authenticatedUser.user);
        storeUserCredentials(authenticatedUser.user);
      })
      .catch((error) => {
        setError(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(`${errorCode}: ${errorMessage}`);
        // .. what next
      });
  };

  const signUp = async (
    email: string,
    password: string,
    username: string,
    fullName: string
  ): Promise<UserCredential> => {
    try {
      const newUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userProfileDocumentRef = doc(
        db,
        "users",
        newUserCredential.user.uid
      );
      await setDoc(userProfileDocumentRef, {
        email,
        uid: newUserCredential.user.uid,
        isVerified: newUserCredential.user.emailVerified,
        fullName,
        username,
        timestamp: serverTimestamp(),
        bio: "",
      }).then((authenticatedUser) => {
        console.log(" not yet authenticatedUser", authenticatedUser);
        // setUser(authenticatedUser.user);
      });
      await sendEmailVerification(newUserCredential.user).then(() => {
        setUser(newUserCredential.user);
      });

      return newUserCredential;
    } catch (error) {
      throw error;
    }
  };

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((authenticatedUser) => {
        // what next
        setUser(authenticatedUser.user);
        storeUserCredentials(authenticatedUser.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(`${errorCode}: ${errorMessage}`);
        // .. what next
      });
  };

  const onLogout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        removeUserCredentials();
      })
      .catch((error) => {
        Alert.alert(error);
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      currentUser,
      emailSignUp,
      signInWithEmail,
      signUp,
      error,
      onLogout,
      //   phoneSignUp,
    }),
    [user, loading, error, currentUser]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
