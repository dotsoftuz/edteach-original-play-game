import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCqJ5W2wWdcM8-V-WQC531Ox7bPIqsmS4",
  authDomain: "ecology-f343b.firebaseapp.com",
  databaseURL: "https://ecology-f343b.firebaseio.com",
  projectId: "ecology-f343b",
  storageBucket: "ecology-f343b.appspot.com",
  messagingSenderId: "106670445616",
  appId: "1:106670445616:web:523371d06b7a4d83c409f5",
  measurementId: "G-EDJ5NY9PGN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();