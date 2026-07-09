import { useState } from "react";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import "./DashboardPage.css";
import TransactionItem from "../components/Transaction/TransactionItem";
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

      <div className="summary-cards">
        <SummaryCard title="Balance" amount={balance} />
        <SummaryCard title="Income" amount={income} />
        <SummaryCard title="Expense" amount={expense} />
      </div>

      <section className="transaction-list">
        <h2 className="transaction-title">Recent Transactions</h2>

        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            title={transaction.title}
            category={transaction.category}
            amount={transaction.amount}
            type={transaction.type}
            date={transaction.date}
          />
        ))}
      </section>
    </main>
  );
}

export default DashboardPage;
