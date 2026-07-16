import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl7A-w0rD2WwS_-M98LzF8ApOCsZd-hpU",
  authDomain: "moneymate-c4b66.firebaseapp.com",
  projectId: "moneymate-c4b66",
  storageBucket: "moneymate-c4b66.firebasestorage.app",
  messagingSenderId: "189061987208",
  appId: "1:189061987208:web:9d99e38a5f2ad8e65b983d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
