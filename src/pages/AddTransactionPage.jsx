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
import { useSettings } from "../context/SettingsContext";
import { categoryTranslationKeys } from "../i18n/translations";

function AddTransactionPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { transactions, addTransaction, updateTransaction } = useTransactions();
  const { t } = useSettings();

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

        toast.success(t("transactionUpdated"));
      } else {
        await addTransaction({
          ...formData,
          amount: Number(formData.amount),
        });

        toast.success(t("transactionAdded"));
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

    const newErrors = validateTransaction(formData, t);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setShowModal(true);
  }

  return (
    <main className="add-page">
      {isEditMode && (
        <Link to="/transactions" className="back-link">
          <ArrowLeft size={16} />
          <span>{t("backToTransactions")}</span>
        </Link>
      )}

      <div className="form-container">
        <h1>{isEditMode ? t("editTransaction") : t("addTransaction")}</h1>

        <p className="form-subtitle">
          {isEditMode
            ? t("editTransactionDescription")
            : t("addTransactionDescription")}
        </p>

        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">{t("title")}</label>

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
            <label htmlFor="category">{t("category")}</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">{t("selectCategory")}</option>

              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {t(categoryTranslationKeys[category.value])}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="error-message">{errors.category}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="amount">{t("amount")}</label>

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
            <label htmlFor="type">{t("transactionType")}</label>

            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">{t("expense")}</option>

              <option value="income">{t("income")}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">{t("date")}</label>

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
            {isEditMode ? t("updateTransaction") : t("addTransaction")}
          </button>
        </form>
      </div>

      {showModal && (
        <ConfirmationModal
          title={isEditMode ? t("updateTransaction") : t("confirmTransaction")}
          subtitle={t("reviewTransaction")}
          warning={
            isEditMode ? t("transactionWillUpdate") : t("transactionWillAdd")
          }
          confirmText={isEditMode ? t("update") : t("addTransaction")}
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
