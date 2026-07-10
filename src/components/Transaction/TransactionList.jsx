import TransactionItem from "./TransactionItem";

function TransactionList({ transactions }) {
  return (
    <>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          title={transaction.title}
          category={transaction.category}
          amount={transaction.amount}
          type={transaction.type}
          date={transaction.date}
        />
      ))}
    </>
  );
}

export default TransactionList;
