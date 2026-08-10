import "./SummaryCard.css";
import { useSettings } from "../../context/SettingsContext";

function SummaryCard({ title, amount, type }) {
  const { t, locale } = useSettings();

  return (
    <article className="summary-card">
      <span className="summary-title">{title}</span>

      <h2 className={`summary-amount ${type || ""}`}>
        ${amount.toLocaleString(locale)}
      </h2>

      <p className="summary-subtitle">
        {type === "income"
          ? t("moneyReceived")
          : type === "expense"
            ? t("moneySpent")
            : t("availableBalance")}
      </p>
    </article>
  );
}

export default SummaryCard;
