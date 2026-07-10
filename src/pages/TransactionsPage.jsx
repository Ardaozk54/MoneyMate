import { useState, useEffect } from "react";
import FilterBar from "../components/Filters/FilterBar";
import "./TransactionsPage.css";
import TransactionList from "../components/Transaction/TransactionList";
import Pagination from "../components/Pagination/Pagination";

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
        <TransactionList transactions={currentTransactions}></TransactionList>
      </section>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </main>
  );
}

export default TransactionsPage;
