import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth, db } from "../firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export async function register(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}
