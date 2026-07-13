import "./ConfirmationModal.css";

function ConfirmationModal({
  title,
  subtitle,
  warning,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        {subtitle && <p className="modal-subtitle">{subtitle}</p>}

        <div className="modal-content">{children}</div>

        {warning && <div className="modal-warning">{warning}</div>}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
