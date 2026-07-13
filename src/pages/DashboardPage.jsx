import SummaryCard from "../components/SummaryCard/SummaryCard";
import "./DashboardPage.css";

import TransactionList from "../components/Transaction/TransactionList";
import AnalyticsChart from "../components/Charts/AnalyticsChart";

import {
  calculateIncome,
  calculateExpense,
  calculateBalance,
} from "../utils/finance";

function DashboardPage({ transactions }) {
  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const balance = calculateBalance(income, expense);

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <h1>Welcome back 👋</h1>

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
