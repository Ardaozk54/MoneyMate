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
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search Transactions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="ALL">All Categories</option>

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
        <option value="ALL">All Types</option>

        <option value="income">Income</option>

        <option value="expense">Expense</option>
      </select>
    </div>
  );
}

export default FilterBar;
