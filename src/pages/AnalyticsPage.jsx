import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartNoAxesCombined,
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import AnalyticsChart from "../components/Charts/AnalyticsChart";
import DashboardSkeleton from "../components/Skeleton/DashboardSkeleton";
import { useTransactions } from "../context/TransactionContext";
import { useSettings } from "../context/SettingsContext";
import {
  calculateBalance,
  calculateExpense,
  calculateIncome,
} from "../utils/finance";
import { getCategoryTotals, getMonthlyTotals } from "../utils/chart";
import { categoryTranslationKeys } from "../i18n/translations";
import "./AnalyticsPage.css";

function AnalyticsPage() {
  const { transactions, loading } = useTransactions();
  const { t, locale } = useSettings();

  if (loading) {
    return <DashboardSkeleton />;
  }

  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const balance = calculateBalance(income, expense);
  const savingsRate = income > 0 ? (balance / income) * 100 : null;
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );
  const averageExpense = expenseTransactions.length
    ? expense / expenseTransactions.length
    : 0;
  const largestExpense = getCategoryTotals(transactions, "expense")[0];

  const monthlyData = getMonthlyTotals(transactions).map((item) => ({
    ...item,
    label: new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "2-digit",
    }).format(new Date(`${item.month}-01T00:00:00`)),
  }));

  const currency = (value) => `$${Number(value).toLocaleString(locale)}`;

  const metrics = [
    {
      label: t("netBalance"),
      value: currency(balance),
      icon: WalletCards,
      tone: balance < 0 ? "danger" : "primary",
    },
    {
      label: t("income"),
      value: currency(income),
      icon: TrendingUp,
      tone: "success",
    },
    {
      label: t("expense"),
      value: currency(expense),
      icon: TrendingDown,
      tone: "danger",
    },
    {
      label: t("savingsRate"),
      value: savingsRate === null ? "—" : `${savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      tone: savingsRate !== null && savingsRate < 0 ? "danger" : "primary",
    },
  ];

  return (
    <main className="analytics-page">
      <header className="analytics-page-header">
        <div>
          <h1>{t("analytics")}</h1>
          <p>{t("analyticsDescription")}</p>
        </div>
      </header>

      <section className="analytics-metrics">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <article className="analytics-metric-card" key={label}>
            <div className={`analytics-metric-icon ${tone}`}>
              <Icon size={20} />
            </div>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </article>
        ))}
      </section>

      {transactions.length === 0 ? (
        <section className="analytics-page-empty">
          <div className="analytics-page-empty-icon">
            <ChartNoAxesCombined size={34} />
          </div>
          <h2>{t("emptyAnalyticsPageTitle")}</h2>
          <p>{t("emptyAnalyticsPageDescription")}</p>
          <Link to="/add-transactions">{t("addFirstTransaction")}</Link>
        </section>
      ) : (
        <>
          <section className="analytics-detail-grid">
            <article className="analytics-panel monthly-flow-panel">
              <header className="analytics-panel-header">
                <div>
                  <h2>{t("monthlyFlow")}</h2>
                  <p>{t("monthlyFlowDescription")}</p>
                </div>
              </header>

              <div className="monthly-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barGap={6}>
                    <CartesianGrid
                      stroke="var(--border)"
                      vertical={false}
                      strokeDasharray="4 4"
                    />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      width={58}
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      tickFormatter={(value) =>
                        new Intl.NumberFormat(locale, {
                          notation: "compact",
                          maximumFractionDigits: 1,
                        }).format(value)
                      }
                    />
                    <Tooltip
                      cursor={{ fill: "var(--surface-2)" }}
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        color: "var(--text)",
                      }}
                      formatter={(value, name) => [currency(value), t(name)]}
                    />
                    <Bar
                      dataKey="income"
                      fill="var(--success)"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      fill="var(--danger)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="monthly-chart-legend">
                <span className="income">
                  <i />
                  {t("income")}
                </span>
                <span className="expense">
                  <i />
                  {t("expense")}
                </span>
              </div>
            </article>

            <article className="analytics-panel insights-panel">
              <header className="analytics-panel-header">
                <div>
                  <h2>{t("keyInsights")}</h2>
                  <p>{t("financialDistribution")}</p>
                </div>
              </header>

              <div className="insight-list">
                <div className="insight-item">
                  <span className="insight-icon danger">
                    <CircleDollarSign size={20} />
                  </span>
                  <div>
                    <span>{t("largestExpenseCategory")}</span>
                    <strong>
                      {largestExpense
                        ? categoryTranslationKeys[largestExpense.name]
                          ? t(categoryTranslationKeys[largestExpense.name])
                          : largestExpense.name
                        : t("noExpenseData")}
                    </strong>
                    {largestExpense && (
                      <small>{currency(largestExpense.value)}</small>
                    )}
                  </div>
                </div>

                <div className="insight-item">
                  <span className="insight-icon primary">
                    <PiggyBank size={20} />
                  </span>
                  <div>
                    <span>{t("averageExpense")}</span>
                    <strong>{currency(averageExpense)}</strong>
                  </div>
                </div>

                <div className="insight-item">
                  <span className="insight-icon success">
                    <ReceiptText size={20} />
                  </span>
                  <div>
                    <span>{t("totalTransactions")}</span>
                    <strong>
                      {transactions.length.toLocaleString(locale)}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <AnalyticsChart transactions={transactions} />
        </>
      )}
    </main>
  );
}

export default AnalyticsPage;
