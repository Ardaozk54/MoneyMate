function TransactionPreview({ transaction }) {
  return (
    <>
      <div className="modal-row">
        <span>Title</span>
        <strong>{transaction.title}</strong>
      </div>

      <div className="modal-row">
        <span>Category</span>
        <strong>{transaction.category}</strong>
      </div>

      <div className="modal-row">
        <span>Amount</span>
        <strong>${Number(transaction.amount).toLocaleString()}</strong>
      </div>

      <div className="modal-row">
        <span>Type</span>
        <strong className={transaction.type}>{transaction.type}</strong>
      </div>

      <div className="modal-row">
        <span>Date</span>
        <strong>{transaction.date}</strong>
      </div>
    </>
  );
}

export default TransactionPreview;
