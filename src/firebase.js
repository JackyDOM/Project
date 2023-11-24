import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXuXYbnMvuzYmNJtGAGlxjPHWG04UiXVQ",
  authDomain: "e-libra-bcb05.firebaseapp.com",
  databaseURL: "https://e-libra-bcb05-default-rtdb.firebaseio.com",
  projectId: "e-libra-bcb05",
  storageBucket: "e-libra-bcb05.appspot.com",
  messagingSenderId: "346191823722",
  appId: "1:346191823722:web:63e71f0e21762409c1db13",
  measurementId: "G-6ENREL2GE8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);