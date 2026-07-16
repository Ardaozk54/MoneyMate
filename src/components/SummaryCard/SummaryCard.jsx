import "./SummaryCard.css";

function SummaryCard({ title, amount, type }) {
  return (
    <article className="summary-card">
      <span className="summary-title">{title}</span>

      <h2 className={`summary-amount ${type || ""}`}>
        ${amount.toLocaleString("tr-TR")}
      </h2>

      <p className="summary-subtitle">
        {type === "income"
          ? "Money received"
          : type === "expense"
            ? "Money spent"
            : "Available balance"}
      </p>
    </article>
  );
}

export default SummaryCard;
