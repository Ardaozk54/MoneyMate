import React from "react";
import "./SummaryCard.css";
function SummaryCard({ title, amount, type }) {
  return (
    <div className="summary-card">
      <p className="summary-title"> {title} </p>

      <h2 className={`summary-amount ${type || ""}`}>
        ${amount.toLocaleString("tr-TR")}
      </h2>
    </div>
  );
}

export default SummaryCard;
