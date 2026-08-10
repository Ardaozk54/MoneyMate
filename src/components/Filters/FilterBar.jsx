import "./FilterBar.css";
import { categories } from "../../constants/categories";
import { useSettings } from "../../context/SettingsContext";
import { categoryTranslationKeys } from "../../i18n/translations";

function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
}) {
  const { t } = useSettings();

  return (
    <section className="filter-bar">
      <input
        type="text"
        placeholder={t("searchTransaction")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="ALL">{t("category")}</option>

        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {t(categoryTranslationKeys[category.value])}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="ALL">{t("type")}</option>
        <option value="income">{t("income")}</option>
        <option value="expense">{t("expense")}</option>
      </select>
    </section>
  );
}

export default FilterBar;
