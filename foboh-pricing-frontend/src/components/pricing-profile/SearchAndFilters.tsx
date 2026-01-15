interface SearchAndFiltersProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  filters: {
    category?: string;
    subCategory?: string;
    segment?: string;
    brand?: string;
  };
  onFilterChange: (key: "category" | "brand" | "segment" | "subCategory", value: string) => void;
  uniqueValues: {
    categories: string[];
    subCategories: string[];
    segments: string[];
    brands: string[];
  };
}

export function SearchAndFilters({
  searchInput,
  onSearchChange,
  filters,
  onFilterChange,
  uniqueValues,
}: SearchAndFiltersProps) {
  return (
    <div className="mb-6">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for Products by Name, SKU or Brand"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-primary"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-base">
          🔍
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <select
          className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-800 cursor-pointer transition-colors focus:outline-none focus:border-primary"
          value={filters.category || ""}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">Category</option>
          {uniqueValues.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-800 cursor-pointer transition-colors focus:outline-none focus:border-primary"
          value={filters.subCategory || ""}
          onChange={(e) => onFilterChange("subCategory", e.target.value)}
        >
          <option value="">Sub Category</option>
          {uniqueValues.subCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-800 cursor-pointer transition-colors focus:outline-none focus:border-primary"
          value={filters.segment || ""}
          onChange={(e) => onFilterChange("segment", e.target.value)}
        >
          <option value="">Segment</option>
          {uniqueValues.segments.map((seg) => (
            <option key={seg} value={seg}>
              {seg}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-800 cursor-pointer transition-colors focus:outline-none focus:border-primary"
          value={filters.brand || ""}
          onChange={(e) => onFilterChange("brand", e.target.value)}
        >
          <option value="">Brand</option>
          {uniqueValues.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
