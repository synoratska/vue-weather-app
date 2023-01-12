/* eslint-disable */

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLM6MOD0SywP_mqzHaOz5fpaJFL54dAiI",
  authDomain: "vueweather-79d11.firebaseapp.com",
  projectId: "vueweather-79d11",
  storageBucket: "vueweather-79d11.appspot.com",
  messagingSenderId: "664016482752",
  appId: "1:664016482752:web:6d4692b961fe775d709825",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
