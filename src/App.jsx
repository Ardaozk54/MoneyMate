import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";

import { mockTransactions } from "./data/mockTransactions";
import { Toaster } from "sonner";

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  console.log("App çalıştı");
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<DashboardPage transactions={transactions} />}
          />
          <Route
            path="/transactions"
            element={
              <TransactionsPage
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/add-transactions"
            element={
              <AddTransactionPage
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
