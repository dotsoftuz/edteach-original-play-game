import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn7JjHWo4b1V8RJA7AkkojYcs5fdhkt6o",
  authDomain: "quizapp-a52ab.firebaseapp.com",
  databaseURL: "https://quizapp-a52ab-default-rtdb.firebaseio.com",
  projectId: "quizapp-a52ab",
  storageBucket: "quizapp-a52ab.appspot.com",
  messagingSenderId: "272134491353",
  appId: "1:272134491353:web:8f7c2af7fceeea523482c8",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();