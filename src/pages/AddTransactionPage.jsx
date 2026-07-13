import { useState } from "react";
import "./AddTransactionPage.css";
import { categories } from "../constants/categories";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import { initialFormData } from "../constants/initialFormData";
import { toast } from "sonner";
import { createTransaction } from "../utils/transaction";
import { validateTransaction } from "../utils/validation";
import TransactionPreview from "../components/TransactionPreview";

function AddTransactionPage({ setTransactions }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleConfirm() {
    const newTransaction = createTransaction(formData);

    setTransactions((prev) => [newTransaction, ...prev]);

    setShowModal(false);

    setErrors({});

    setFormData(initialFormData);

    toast.success("Transaction added successfully!");

    navigate("/");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validateTransaction(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setShowModal(true);
  }

  return (
    <main className="add-page">
      <div className="form-container">
        <h1>Add Transaction</h1>
        <p className="form-subtitle">
          Keep your finances organized by adding a new transaction.
        </p>

        <form className="transaction-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Netflix Subscription"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="error-message">{errors.category}</p>
            )}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount">Amount</label>

            <div className="amount-input">
              <span>$</span>

              <input
                id="amount"
                type="number"
                name="amount"
                placeholder="0"
                value={formData.amount}
                onChange={handleChange}
                className={errors.amount ? "input-error" : ""}
              />
            </div>

            {errors.amount && <p className="error-message">{errors.amount}</p>}
          </div>

          {/* Type */}
          <div className="form-group">
            <label htmlFor="type">Transaction Type</label>

            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Date</label>

            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? "input-error" : ""}
            />

            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>

          <button className="submit-btn" type="submit">
            Add Transaction
          </button>
        </form>

        {/* Debug - geliştirme sırasında kullan */}
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </div>

      {showModal && (
        <ConfirmationModal
          title="Confirm Transaction"
          subtitle="Please review the transaction details before confirming."
          warning="This transaction will be added to your finance history."
          confirmText="Add Transaction"
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        >
          <TransactionPreview transaction={formData} />
        </ConfirmationModal>
      )}
    </main>
  );
}

export default AddTransactionPage;
