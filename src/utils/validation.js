export function validateTransaction(formData, t = (key) => key) {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = t("titleRequired");
  }

  if (!formData.category) {
    errors.category = t("categoryRequired");
  }

  if (!formData.amount || Number(formData.amount) <= 0) {
    errors.amount = t("amountRequired");
  }

  if (!formData.date) {
    errors.date = t("dateRequired");
  }

  return errors;
}
