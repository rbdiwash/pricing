import { ProductPricingSummary } from "./ProductPricingSummary";
import type { Product, PricingProfileType } from "../../types/product";
import type { PricingProfile } from "../../hooks/usePricingProfiles";
import { PriceAdjustmentControls } from "./PriceAdjustmentControls";
import { PricingTable } from "./PricingTable";
import { ProfileTypeSelector } from "./ProfileTypeSelector";
import { SearchAndFilters } from "./SearchAndFilters";
import { ProductCard } from "../ProductCard";

interface ProductPricingSectionProps {
  currentStep: number;
  selectedCount: number;
  selectedProducts: Set<string>;
  selectedProductsData: Product[];
  priceAdjustment: {
    basedOn: string;
    mode: "fixed" | "dynamic";
    incrementMode: "increase" | "decrease";
    adjustmentValue: number;
  };
  onMakeChanges: () => void;
  // Form props
  profileType: PricingProfileType;
  onProfileTypeChange: (type: PricingProfileType) => void;
  searchInput: string;
  onSearchChange: (value: string) => void;
  filters: {
    category?: string;
    subCategory?: string;
    segment?: string;
    brand?: string;
  };
  onFilterChange: (
    key: "category" | "brand" | "segment" | "subCategory",
    value: string
  ) => void;
  uniqueValues: {
    categories: string[];
    subCategories: string[];
    segments: string[];
    brands: string[];
  };
  products: Product[];
  isLoading: boolean;
  onToggleProduct: (productId: string) => void;
  isAllSelected: boolean;
  isNoneSelected: boolean;
  onSelectAll: () => void;
  onBasedOnChange: (value: string) => void;
  onModeChange: (mode: "fixed" | "dynamic") => void;
  onIncrementModeChange: (mode: "increase" | "decrease") => void;
  onAdjustmentValueChange: (value: number) => void;
  pricingProfiles: PricingProfile[];
  isLoadingProfiles: boolean;
  calculateNewPrice: (product: Product) => number;
  onRefresh: () => void;
}

export function ProductPricingSection({
  currentStep,
  selectedCount,
  selectedProducts,
  selectedProductsData,
  priceAdjustment,
  onMakeChanges,
  profileType,
  onProfileTypeChange,
  searchInput,
  onSearchChange,
  filters,
  onFilterChange,
  uniqueValues,
  products,
  isLoading,
  onToggleProduct,
  isAllSelected,
  isNoneSelected,
  onSelectAll,
  pricingProfiles,
  isLoadingProfiles,
  calculateNewPrice,
  onRefresh,
  onBasedOnChange,
  onModeChange,
  onIncrementModeChange,
  onAdjustmentValueChange,
}: ProductPricingSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 m-0 mb-1">
            Set Product Pricing
          </h3>
          <p className="text-gray-600 text-sm m-0">
            Cheeky little description goes in here.
          </p>
        </div>
        {currentStep >= 2 && (
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Completed
          </span>
        )}
      </div>

      {currentStep >= 2 && selectedCount > 0 ? (
        <ProductPricingSummary
          selectedProducts={selectedProductsData}
          selectedCount={selectedCount}
          priceAdjustment={priceAdjustment}
          onMakeChanges={onMakeChanges}
        />
      ) : (
        <>
          <ProfileTypeSelector
            profileType={profileType}
            onProfileTypeChange={onProfileTypeChange}
          />

          <SearchAndFilters
            searchInput={searchInput}
            onSearchChange={onSearchChange}
            filters={filters}
            onFilterChange={onFilterChange}
            uniqueValues={uniqueValues}
          />

          {/* Products Header */}
          <div className="bg-gray-50 px-4 py-3 rounded-md mb-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <p className="text-gray-600 text-sm m-0">
                Showing {products?.length} Result
                {products?.length !== 1 ? "s" : ""} for{" "}
                {searchInput || filters.brand || "Product Name or SKU Code"}
                {filters.brand && filters.brand}
              </p>
              {profileType !== "all" && (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800">
                    <input
                      type="radio"
                      name="selectAll"
                      checked={isNoneSelected}
                      onChange={onSelectAll}
                      className="w-4 h-4 cursor-pointer accent-primary"
                    />
                    <span>Deselect All</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800">
                    <input
                      type="radio"
                      name="selectAll"
                      checked={isAllSelected}
                      onChange={onSelectAll}
                      className="w-4 h-4 cursor-pointer accent-primary"
                    />
                    <span>Select all</span>
                  </label>
                </div>
              )}
              {profileType === "all" && (
                <span className="text-xs text-gray-600 italic">
                  All products are automatically selected
                </span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-gray-600 text-sm">
              Loading products...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mb-6">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedProducts.has(product.id)}
                  onToggle={onToggleProduct}
                  disabled={profileType === "all"}
                />
              ))}
            </div>
          )}

          {products?.length === 0 && !isLoading && (
            <div className="text-center py-12 text-gray-600 text-sm">
              No products found
            </div>
          )}

          {/* Selected Summary */}
          {selectedProducts.size > 0 && (
            <div className="p-4 bg-green-50 rounded-md text-gray-700 text-sm text-center mb-6">
              You've selected{" "}
              <strong className="text-gray-900 font-semibold">
                {selectedProducts.size} Product
                {selectedProducts.size !== 1 ? "s" : ""}
              </strong>
              , these will be added to{" "}
              <strong className="text-gray-900 font-semibold">
                Profile Name
              </strong>
              .
            </div>
          )}

          {/* Price Adjustment Controls */}
          {selectedProducts.size > 0 && (
            <>
              <PriceAdjustmentControls
                basedOn={priceAdjustment.basedOn}
                onBasedOnChange={onBasedOnChange}
                mode={priceAdjustment.mode}
                onModeChange={onModeChange}
                incrementMode={priceAdjustment.incrementMode}
                onIncrementModeChange={onIncrementModeChange}
                adjustmentValue={priceAdjustment.adjustmentValue}
                onAdjustmentValueChange={onAdjustmentValueChange}
                pricingProfiles={pricingProfiles}
                isLoadingProfiles={isLoadingProfiles}
              />

              <PricingTable
                products={selectedProductsData}
                priceAdjustment={priceAdjustment}
                calculateNewPrice={calculateNewPrice}
                onRefresh={onRefresh}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
