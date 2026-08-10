import "./AnalyticsChart.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { getCategoryTotals, getTotalAmount } from "../../utils/chart";
import { categories } from "../../constants/categories";
import { COLORS } from "./chartscolor";
import { categoryTranslationKeys } from "../../i18n/translations";
import { useSettings } from "../../context/SettingsContext";

export default function AnalyticsChart({ transactions }) {
  const [mode, setMode] = useState("expense");
  const { t, locale } = useSettings();

  const rawData = getCategoryTotals(transactions, mode);

  const data = rawData.map((item, index) => ({
    ...item,
    name: categoryTranslationKeys[item.name]
      ? t(categoryTranslationKeys[item.name])
      : categories.find((c) => c.value === item.name)?.label || item.name,
    color: COLORS[index % COLORS.length],
  }));

  const total = getTotalAmount(data);

  return (
    <section className="analytics-card">
      <header className="analytics-header">
        <div>
          <h2>{t("analytics")}</h2>
          <p>{t("financialDistribution")}</p>
        </div>

        <div className="switch">
          <button
            className={mode === "expense" ? "active" : ""}
            onClick={() => setMode("expense")}
          >
            {t("expense")}
          </button>

          <button
            className={mode === "income" ? "active" : ""}
            onClick={() => setMode("income")}
          >
            {t("income")}
          </button>
        </div>
      </header>

      {total > 0 ? (
        <div className="analytics-content">
          <div className="chart-section">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={84}
                  outerRadius={108}
                  paddingAngle={2}
                  stroke="var(--surface)"
                  strokeWidth={2}
                  animationDuration={600}
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    color: "var(--text)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="chart-center">
              <span>{t("total")}</span>
              <h3>${total.toLocaleString(locale)}</h3>
            </div>
          </div>

          <div className="stats-section">
            {data.map((item) => {
              const percent = total
                ? ((item.value / total) * 100).toFixed(0)
                : 0;

              return (
                <div className="stat-item" key={item.name}>
                  <div className="stat-top">
                    <div className="label">
                      <span
                        className="dot"
                        style={{ background: item.color }}
                      />
                      {item.name}
                    </div>

                    <span>{percent}%</span>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${percent}%`,
                        background: item.color,
                      }}
                    />
                  </div>

                  <span className="amount">
                    ${item.value.toLocaleString(locale)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="analytics-empty" role="status">
          <div className="analytics-empty-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h3>{t("noAnalyticsTitle")}</h3>
          <p>{t("noAnalyticsDescription")}</p>
        </div>
      )}
    </section>
  );
}
