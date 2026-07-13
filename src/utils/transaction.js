export function createTransaction(formData) {
  return {
    id: Date.now(),
    title: formData.title,
    category: formData.category,
    amount: Number(formData.amount),
    type: formData.type,
    date: formData.date,
  };
}
