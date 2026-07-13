import { useState, useEffect } from "react";
import FilterBar from "../components/Filters/FilterBar";
import "./TransactionsPage.css";
import TransactionList from "../components/Transaction/TransactionList";
import Pagination from "../components/Pagination/Pagination";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function TransactionsPage({ transactions, setTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");

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

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage,
  );
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  function handleDelete(id) {
    const transaction = transactions.find(
      (transaction) => transaction.id === id,
    );

    setSelectedTransaction(transaction);
  }

  function confirmDelete() {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== selectedTransaction.id),
    );

    toast.success("Transaction deleted successfully!");

    setSelectedTransaction(null);
  }

  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/edit-transaction/${id}`);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    <main className="transactions-page">
      <section className="page-header">
        <h1>Transactions</h1>

        <p> View and manage all your income and expenses. </p>
      </section>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
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
          title="Delete Transaction"
          subtitle="This action cannot be undone."
          warning="The selected transaction will be permanently removed."
          confirmText="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setSelectedTransaction(null)}
        >
          <div className="modal-row">
            <span>Title</span>
            <strong>{selectedTransaction.title}</strong>
          </div>

          <div className="modal-row">
            <span>Category</span>
            <strong>{selectedTransaction.category}</strong>
          </div>

          <div className="modal-row">
            <span>Amount</span>
            <strong>${selectedTransaction.amount.toLocaleString()}</strong>
          </div>

          <div className="modal-row">
            <span>Date</span>
            <strong>{selectedTransaction.date}</strong>
          </div>
        </ConfirmationModal>
      )}
    </main>
  );
}

export default TransactionsPage;
