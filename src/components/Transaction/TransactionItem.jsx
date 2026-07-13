import "./TransactionItem.css";
import { Trash2 } from "lucide-react";

function TransactionItem({
  title,
  category,
  amount,
  type,
  date,
  id,
  onDelete,
}) {
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>

      <div className="transaction-meta">
        <h3 className={`transaction-amount-${type}`}>
          ${amount.toLocaleString("tr-TR")}
        </h3>
        <p>{date}</p>
      </div>

      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(id)}>
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}

export default TransactionItem;
