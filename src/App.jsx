import { Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";

import { Toaster } from "sonner";

function App() {
  console.log("App çalıştı");
  return (
    <>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/add-transactions" element={<AddTransactionPage />} />

          <Route
            path="/edit-transaction/:id"
            element={<AddTransactionPage />}
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
      </Routes>

      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
