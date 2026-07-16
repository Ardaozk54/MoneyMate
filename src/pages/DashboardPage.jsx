import "./DashboardPage.css";

import SummaryCard from "../components/SummaryCard/SummaryCard";
import TransactionList from "../components/Transaction/TransactionList";
import AnalyticsChart from "../components/Charts/AnalyticsChart";

import { useTransactions } from "../context/TransactionContext";

import {
  calculateIncome,
  calculateExpense,
  calculateBalance,
} from "../utils/finance";

import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { transactions, loading } = useTransactions();
  const { user } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const balance = calculateBalance(income, expense);

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <h1>
          Welcome back
          {user?.displayName ? `, ${user.displayName}` : ""} 👋
        </h1>

        <p>Track your finances with confidence.</p>
      </section>

      <section className="summary-cards">
        <SummaryCard title="Balance" amount={balance} />

        <SummaryCard title="Income" amount={income} type="income" />

        <SummaryCard title="Expense" amount={expense} type="expense" />
      </section>

      <section className="transaction-list">
        <h2 className="transaction-title">Recent Transactions</h2>

        <TransactionList transactions={transactions.slice(0, 5)} />
      </section>

      <section className="dashboard-analytics">
        <AnalyticsChart transactions={transactions} />
      </section>
    </main>
  );
}

export default DashboardPage;
