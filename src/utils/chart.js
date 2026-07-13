export function getCategoryTotals(transactions, type) {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === type,
  );

  const grouped = {};

  filteredTransactions.forEach((transaction) => {
    const { category, amount } = transaction;

    grouped[category] = (grouped[category] || 0) + amount;
  });

  return Object.entries(grouped)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);
}

export function getTotalAmount(data) {
  return data.reduce((total, item) => total + item.value, 0);
}
