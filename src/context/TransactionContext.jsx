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
  const [loadedUserId, setLoadedUserId] = useState(null);
  const loading = Boolean(user && loadedUserId !== user.uid);

  async function loadTransactions() {
    if (!user) {
      setTransactions([]);
      return;
    }

    try {
      const data = await getTransactions(user.uid);

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadedUserId(user.uid);
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
    let ignore = false;

    async function initializeTransactions() {
      if (!user) {
        await Promise.resolve();

        if (!ignore) {
          setTransactions([]);
          setLoadedUserId(null);
        }

        return;
      }

      try {
        const data = await getTransactions(user.uid);

        if (!ignore) {
          setTransactions(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoadedUserId(user.uid);
        }
      }
    }

    initializeTransactions();

    return () => {
      ignore = true;
    };
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
