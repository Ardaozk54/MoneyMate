export function validateTransaction(formData) {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!formData.category) {
    errors.category = "Please select a category.";
  }

  if (!formData.amount || Number(formData.amount) <= 0) {
    errors.amount = "Amount must be greater than zero.";
  }

  if (!formData.date) {
    errors.date = "Please select a date.";
  }

  return errors;
}
