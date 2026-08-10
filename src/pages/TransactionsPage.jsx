import { useState } from "react";
import FilterBar from "../components/Filters/FilterBar";
import "./TransactionsPage.css";
import TransactionList from "../components/Transaction/TransactionList";
import Pagination from "../components/Pagination/Pagination";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import TransactionsSkeleton from "../components/Skeleton/TransactionsSkeleton";
import { useSettings } from "../context/SettingsContext";
import { categoryTranslationKeys } from "../i18n/translations";

function TransactionsPage() {
  const { transactions, deleteTransaction, loading } = useTransactions();
  const { t, locale } = useSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  function updateFilter(setter, value) {
    setter(value);
    setCurrentPage(1);
  }

  if (loading) {
    return <TransactionsSkeleton />;
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || transaction.category === selectedCategory;

    const matchesType =
      selectedType === "ALL" || transaction.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const transactionsPerPage = 5;
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage,
  );
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  function handleDelete(id) {
    const transaction = transactions.find(
      (transaction) => transaction.id === id,
    );

    setSelectedTransaction(transaction);
  }

  async function confirmDelete() {
    try {
      await deleteTransaction(selectedTransaction.id);

      toast.success(t("transactionDeleted"));

      setSelectedTransaction(null);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleEdit(id) {
    navigate(`/edit-transaction/${id}`);
  }

  return (
    <main className="transactions-page">
      <section className="page-header">
        <h1>{t("transactions")}</h1>

        <p>{t("transactionsDescription")}</p>
      </section>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={(value) => updateFilter(setSearchTerm, value)}
        selectedCategory={selectedCategory}
        setSelectedCategory={(value) =>
          updateFilter(setSelectedCategory, value)
        }
        selectedType={selectedType}
        setSelectedType={(value) => updateFilter(setSelectedType, value)}
      />

      <section className="transactions-container">
        <TransactionList
          transactions={currentTransactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {selectedTransaction && (
        <ConfirmationModal
          title={t("deleteTransaction")}
          subtitle={t("cannotUndo")}
          warning={t("deleteWarning")}
          confirmText={t("delete")}
          onConfirm={confirmDelete}
          onCancel={() => setSelectedTransaction(null)}
        >
          <div className="modal-row">
            <span>{t("title")}</span>
            <strong>{selectedTransaction.title}</strong>
          </div>

          <div className="modal-row">
            <span>{t("category")}</span>
            <strong>
              {categoryTranslationKeys[selectedTransaction.category]
                ? t(categoryTranslationKeys[selectedTransaction.category])
                : selectedTransaction.category}
            </strong>
          </div>

          <div className="modal-row">
            <span>{t("amount")}</span>
            <strong>
              ${selectedTransaction.amount.toLocaleString(locale)}
            </strong>
          </div>

          <div className="modal-row">
            <span>{t("date")}</span>
            <strong>{selectedTransaction.date}</strong>
          </div>
        </ConfirmationModal>
      )}
    </main>
  );
}

export default TransactionsPage;
