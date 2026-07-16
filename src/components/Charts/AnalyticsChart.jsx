import "./AnalyticsChart.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { getCategoryTotals, getTotalAmount } from "../../utils/chart";
import { categories } from "../../constants/categories";
import { COLORS } from "./chartscolor";

export default function AnalyticsChart({ transactions }) {
  const [mode, setMode] = useState("expense");

  const rawData = getCategoryTotals(transactions, mode);

  const data = rawData.map((item, index) => ({
    ...item,
    name: categories.find((c) => c.value === item.name)?.label || item.name,
    color: COLORS[index % COLORS.length],
  }));

  const total = getTotalAmount(data);

  return (
    <section className="analytics-card">
      <header className="analytics-header">
        <div>
          <h2>Analytics</h2>
          <p>Financial distribution</p>
        </div>

        <div className="switch">
          <button
            className={mode === "expense" ? "active" : ""}
            onClick={() => setMode("expense")}
          >
            Expense
          </button>

          <button
            className={mode === "income" ? "active" : ""}
            onClick={() => setMode("income")}
          >
            Income
          </button>
        </div>
      </header>

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
                  background: "#171B24",
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center">
            <span>Total</span>
            <h3>${total.toLocaleString()}</h3>
          </div>
        </div>

        <div className="stats-section">
          {data.map((item) => {
            const percent = total ? ((item.value / total) * 100).toFixed(0) : 0;

            return (
              <div className="stat-item" key={item.name}>
                <div className="stat-top">
                  <div className="label">
                    <span className="dot" style={{ background: item.color }} />
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

                <span className="amount">${item.value.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
