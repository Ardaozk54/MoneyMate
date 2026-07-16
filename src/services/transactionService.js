import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const transactionsRef = collection(db, "transactions");

export async function addTransaction(transaction, userId) {
  try {
    const docRef = await addDoc(transactionsRef, {
      ...transaction,
      userId,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
}

export async function getTransactions(userId) {
  try {
    const q = query(transactionsRef, where("userId", "==", userId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
}

export async function updateTransaction(id, data) {
  try {
    await updateDoc(doc(db, "transactions", id), data);
  } catch (error) {
    throw error;
  }
}

export async function deleteTransaction(id) {
  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) {
    throw error;
  }
}
