import "./DashboardPage.css";

import SummaryCard from "../components/SummaryCard/SummaryCard";
import TransactionList from "../components/Transaction/TransactionList";
import AnalyticsChart from "../components/Charts/AnalyticsChart";
import DashboardSkeleton from "../components/Skeleton/DashboardSkeleton";

import { useTransactions } from "../context/TransactionContext";

import {
  calculateIncome,
  calculateExpense,
  calculateBalance,
} from "../utils/finance";
import { useSettings } from "../context/SettingsContext";

function DashboardPage() {
  const { transactions, loading } = useTransactions();
  const { t } = useSettings();

  if (loading) {
    return <DashboardSkeleton />;
  }

  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const balance = calculateBalance(income, expense);

  return (
    <main className="dashboard">
      <section className="summary-cards">
        <SummaryCard title={t("balance")} amount={balance} />

        <SummaryCard title={t("income")} amount={income} type="income" />

        <SummaryCard title={t("expense")} amount={expense} type="expense" />
      </section>

      <section className="dashboard-grid">
        <AnalyticsChart transactions={transactions} />

        <section className="transaction-list">
          <div className="transaction-header">
            <h2 className="transaction-title">{t("recentTransactions")}</h2>
          </div>

          <TransactionList transactions={transactions.slice(0, 5)} />
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;
