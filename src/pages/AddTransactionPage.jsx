import { useState, useEffect } from "react";
import "./AddTransactionPage.css";

import { categories } from "../constants/categories";
import { initialFormData } from "../constants/initialFormData";
import { validateTransaction } from "../utils/validation";

import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { useTransactions } from "../context/TransactionContext";

import ConfirmationModal from "../components/Modal/ConfirmationModal";
import TransactionPreview from "../components/Transaction/TransactionPreview";

function AddTransactionPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { transactions, addTransaction, updateTransaction } = useTransactions();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const transactionToEdit = transactions.find(
    (transaction) => transaction.id === id,
  );

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
  }, [transactionToEdit]);

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

  async function handleConfirm() {
    try {
      if (isEditMode) {
        await updateTransaction(id, {
          ...formData,
          amount: Number(formData.amount),
        });

        toast.success("Transaction updated successfully!");
      } else {
        await addTransaction({
          ...formData,
          amount: Number(formData.amount),
        });

        toast.success("Transaction added successfully!");
      }

      setShowModal(false);
      setErrors({});
      setFormData(initialFormData);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
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
      {isEditMode && (
        <Link to="/transactions" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Transactions</span>
        </Link>
      )}

      <div className="form-container">
        <h1>{isEditMode ? "Edit Transaction" : "Add Transaction"}</h1>

        <p className="form-subtitle">
          {isEditMode
            ? "Update your transaction details."
            : "Keep your finances organized by adding a new transaction."}
        </p>

        <form className="transaction-form" onSubmit={handleSubmit}>
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
            {isEditMode ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>

      {showModal && (
        <ConfirmationModal
          title={isEditMode ? "Update Transaction" : "Confirm Transaction"}
          subtitle="Please review the transaction details before confirming."
          warning={
            isEditMode
              ? "This transaction will be updated."
              : "This transaction will be added to your finance history."
          }
          confirmText={isEditMode ? "Update" : "Add Transaction"}
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
