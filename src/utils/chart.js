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

export function getMonthlyTotals(transactions, limit = 6) {
  const grouped = {};

  transactions.forEach((transaction) => {
    const month = transaction.date?.slice(0, 7);

    if (!month || !/^\d{4}-\d{2}$/.test(month)) return;

    if (!grouped[month]) {
      grouped[month] = { month, income: 0, expense: 0 };
    }

    if (transaction.type === "income" || transaction.type === "expense") {
      grouped[month][transaction.type] += Number(transaction.amount) || 0;
    }
  });

  return Object.values(grouped)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-limit);
}
