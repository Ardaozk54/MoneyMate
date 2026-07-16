import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
import {
  getTransactions,
  addTransaction as addTransactionService,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from "../services/transactionService";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      const data = await getTransactions(user.uid);

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(transaction) {
    await addTransactionService(transaction, user.uid);

    await loadTransactions();
  }

  async function updateTransaction(id, data) {
    await updateTransactionService(id, data);

    await loadTransactions();
  }

  async function deleteTransaction(id) {
    await deleteTransactionService(id);

    await loadTransactions();
  }

  useEffect(() => {
    if (user) {
      loadTransactions();
    } else {
      setTransactions([]);
      setLoading(false);
    }
  }, [user]);
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions: loadTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}
