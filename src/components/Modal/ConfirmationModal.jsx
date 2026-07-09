import "./ConfirmationModal.css";

function ConfirmationModal({ formData, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Transaction</h2>

        <p className="modal-subtitle">
          Please review the transaction details before confirming.
        </p>

        <div className="modal-content">
          <div className="modal-row">
            <span>Title</span>
            <strong>{formData.title}</strong>
          </div>

          <div className="modal-row">
            <span>Category</span>
            <strong>{formData.category}</strong>
          </div>

          <div className="modal-row">
            <span>Amount</span>
            <strong>${Number(formData.amount).toLocaleString()}</strong>
          </div>

          <div className="modal-row">
            <span>Type</span>
            <strong className={formData.type}>{formData.type}</strong>
          </div>

          <div className="modal-row">
            <span>Date</span>
            <strong>{formData.date}</strong>
          </div>
        </div>

        <div className="modal-warning">
          This transaction will be added to your finance history.
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
