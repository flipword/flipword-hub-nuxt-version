import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export enum AuthMethod {
  GOOGLE = 1,
  APPLE = 2,
}
const firebaseConfig = {
  apiKey: "AIzaSyCuon7WUdd609Y85oBJJbD8ul3eGoO8RDs",
  authDomain: "flutter-flip-card.firebaseapp.com",
  databaseURL: "https://flutter-flip-card.firebaseio.com",
  projectId: "flutter-flip-card",
  storageBucket: "flutter-flip-card.appspot.com",
  messagingSenderId: "186673725150",
  appId: "1:186673725150:web:2e45457bb4499811f30c4f",
  measurementId: "G-K5QTK9Y7PD",
};

export default defineNuxtPlugin(async (nuxtApp) => {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    const test = await signInWithPopup(auth, provider);
    console.log("Auth : ", test);
  };

  nuxtApp.provide("auth", {
    signInWithGoogle: signInWithGoogle,
  });
});
