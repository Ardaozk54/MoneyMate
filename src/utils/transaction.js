const newTransaction = {
  id: Date.now(),

  title: formData.title,

  category: formData.category,

  amount: Number(formData.amount),

  type: formData.type,

  date: formData.date,
};
