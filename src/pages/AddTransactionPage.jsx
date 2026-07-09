import { useState } from "react";
import "./AddTransactionPage.css";
import { categories } from "../constants/categories";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import { initialFormData } from "../constants/initialFormData";
function AddTransactionPage({ setTransactions }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(initialFormData);

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than zero.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleConfirm() {
    const newTransaction = {
      id: Date.now(),

      title: formData.title,

      category: formData.category,

      amount: Number(formData.amount),

      type: formData.type,

      date: formData.date,
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setShowModal(false);

    setErrors({});

    setFormData(initialFormData);

    navigate("/");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

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
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
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
              />
            </div>
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
            />
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
          formData={formData}

          onCancel={() => setShowModal(false)}

          onConfirm={handleConfirm}
        />
      )}
    </main>
  );
}

export default AddTransactionPage;
