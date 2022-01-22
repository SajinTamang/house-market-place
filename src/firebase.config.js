
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAf13KduEhA-1un0TX1s8JduscCXFxLCDc",
  authDomain: "house-marketplace-app-a6174.firebaseapp.com",
  projectId: "house-marketplace-app-a6174",
  storageBucket: "house-marketplace-app-a6174.appspot.com",
  messagingSenderId: "842973916321",
  appId: "1:842973916321:web:0effcffb8fc5094cf414e0",
  measurementId: "G-TNNYBDJE42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore();

