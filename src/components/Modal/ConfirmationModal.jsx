import "./ConfirmationModal.css";
import { useSettings } from "../../context/SettingsContext";

function ConfirmationModal({
  title,
  subtitle,
  warning,
  confirmText = "Confirm",
  cancelText,
  onConfirm,
  onCancel,
  children,
}) {
  const { t } = useSettings();

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        {subtitle && <p className="modal-subtitle">{subtitle}</p>}

        <div className="modal-content">{children}</div>

        {warning && <div className="modal-warning">{warning}</div>}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            {cancelText || t("cancel")}
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
