// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTGroSOutSLT6qV0WOgGB6_ad16s5CL7A",
  authDomain: "scribe-speak-your-mind.firebaseapp.com",
  projectId: "scribe-speak-your-mind",
  storageBucket: "scribe-speak-your-mind.appspot.com",
  messagingSenderId: "10439373637",
  appId: "1:10439373637:web:037047d5ead5f9be3ac42c",
  measurementId: "G-KZBRB80TLK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
