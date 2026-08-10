import { useSettings } from "../../context/SettingsContext";
import { categoryTranslationKeys } from "../../i18n/translations";

function TransactionPreview({ transaction }) {
  const { t, locale } = useSettings();

  return (
    <>
      <div className="modal-row">
        <span>{t("title")}</span>
        <strong>{transaction.title}</strong>
      </div>

      <div className="modal-row">
        <span>{t("category")}</span>
        <strong>
          {categoryTranslationKeys[transaction.category]
            ? t(categoryTranslationKeys[transaction.category])
            : transaction.category}
        </strong>
      </div>

      <div className="modal-row">
        <span>{t("amount")}</span>
        <strong>${Number(transaction.amount).toLocaleString(locale)}</strong>
      </div>

      <div className="modal-row">
        <span>{t("type")}</span>
        <strong className={transaction.type}>{t(transaction.type)}</strong>
      </div>

      <div className="modal-row">
        <span>{t("date")}</span>
        <strong>{transaction.date}</strong>
      </div>
    </>
  );
}

export default TransactionPreview;
