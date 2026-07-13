import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          id={transaction.id}
          title={transaction.title}
          category={transaction.category}
          amount={transaction.amount}
          type={transaction.type}
          date={transaction.date}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

export default TransactionList;
