import "./AnalyticsChart.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo, useState } from "react";
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
    <div className="analytics-card">
      <div className="analytics-header">
        <div>
          <h2>Analytics</h2>
          <p>Track your financial distribution</p>
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
      </div>

      <div className="analytics-content">
        <div className="chart-section">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                key={mode}
                data={data}
                dataKey="value"
                innerRadius={78}
                outerRadius={110}
                paddingAngle={4}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center">
            <span>Total</span>
            <h3>${total.toLocaleString()}</h3>
          </div>
        </div>

        <div className="stats-section">
          {data.map((item) => {
            const percent = ((item.value / total) * 100).toFixed(0);

            return (
              <div className="stat-item" key={item.name}>
                <div className="stat-top">
                  <div className="label">
                    <span
                      className="dot"
                      style={{
                        background: item.color,
                      }}
                    ></span>

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
                  ></div>
                </div>

                <div className="amount">${item.value.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
