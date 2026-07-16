import "./FilterBar.css";
import { categories } from "../../constants/categories";

function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
}) {
  return (
    <section className="filter-bar">
      <input
        type="text"
        placeholder="Search transaction..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="ALL">Category</option>

        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="ALL">Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </section>
  );
}

export default FilterBar;
