// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqYi8xYZnmq21XWLQs_hTNizES8K3FoWw",
  authDomain: "shop-web-api.firebaseapp.com",
  projectId: "shop-web-api",
  storageBucket: "shop-web-api.appspot.com",
  messagingSenderId: "1086557440567",
  appId: "1:1086557440567:web:1591226bcae95234508db2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
