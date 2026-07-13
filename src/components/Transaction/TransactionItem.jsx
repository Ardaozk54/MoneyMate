import "./TransactionItem.css";
import { categories } from "../../constants/categories";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

function TransactionItem({
  title,
  category,
  amount,
  type,
  date,
  id,
  onDelete,
  onEdit,
}) {
  const categoryLabel =
    categories.find((c) => c.value === category)?.label || category;
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h3>{title}</h3>
        <p>{categoryLabel}</p>
      </div>

      <div className="transaction-meta">
        <h3 className={`transaction-amount-${type}`}>
          ${amount.toLocaleString("tr-TR")}
        </h3>
        <p>{date}</p>
      </div>

      <div className="transaction-actions">
        {onEdit && (
          <button className="edit-btn" onClick={() => onEdit(id)}>
            <Pencil size={17} strokeWidth={2.2} />
          </button>
        )}

        {onDelete && (
          <button className="delete-btn" onClick={() => onDelete(id)}>
            <Trash2 size={17} strokeWidth={2.2} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionItem;
