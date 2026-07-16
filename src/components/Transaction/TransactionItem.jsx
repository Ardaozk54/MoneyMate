import "./TransactionItem.css";
import { categories } from "../../constants/categories";
import { Trash2, Pencil } from "lucide-react";

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
    <article className="transaction-item">
      <div className="transaction-info">
        <h3>{title}</h3>

        <span className="category-badge">{categoryLabel}</span>
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
            <Pencil size={16} />
          </button>
        )}

        {onDelete && (
          <button className="delete-btn" onClick={() => onDelete(id)}>
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </article>
  );
}

export default TransactionItem;
