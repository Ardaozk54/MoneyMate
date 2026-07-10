import { useState } from "react";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import "./DashboardPage.css";
import TransactionItem from "../components/Transaction/TransactionItem";
import {
  calculateIncome,
  calculateExpense,
  calculateBalance,
} from "../utils/finance";

import TransactionList from "../components/Transaction/TransactionList";

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
        <SummaryCard title="Income" amount={income} type="income" />
        <SummaryCard title="Expense" amount={expense} type="expense" />
      </div>

      <section className="transaction-list">
        <h2 className="transaction-title">Recent Transactions</h2>

        <TransactionList transactions={transactions.slice(0, 5)} />
      </section>
    </main>
  );
}

export default DashboardPage;
