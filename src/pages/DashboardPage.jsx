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

function DashboardPage() {
  const { transactions, loading } = useTransactions();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const balance = calculateBalance(income, expense);

  return (
    <main className="dashboard">
      <section className="summary-cards">
        <SummaryCard title="Balance" amount={balance} />

        <SummaryCard title="Income" amount={income} type="income" />

        <SummaryCard title="Expense" amount={expense} type="expense" />
      </section>

      <section className="dashboard-grid">
        <AnalyticsChart transactions={transactions} />

        <section className="transaction-list">
          <div className="transaction-header">
            <h2 className="transaction-title">Recent Transactions</h2>
          </div>

          <TransactionList transactions={transactions.slice(0, 5)} />
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;
