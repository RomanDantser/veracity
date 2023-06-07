import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZX9womxG0XK-CYLKMD2jyRZuOtrZCCoo",
  authDomain: "veracity-40dbf.firebaseapp.com",
  databaseURL: "https://veracity-40dbf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "veracity-40dbf",
  storageBucket: "veracity-40dbf.appspot.com",
  messagingSenderId: "1086064911084",
  appId: "1:1086064911084:web:2760cc492b8a4e9e56bbc9",
  measurementId: "G-4XX9KH9TQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;