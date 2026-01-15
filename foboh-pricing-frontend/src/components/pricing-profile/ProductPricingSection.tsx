import { ProductPricingSummary } from "./ProductPricingSummary";
import { ProductPricingForm } from "./ProductPricingForm";
import type { Product, PricingProfileType } from "../../types/product";
import type { PricingProfile } from "../../hooks/usePricingProfiles";

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
        <ProductPricingForm
          profileType={profileType}
          onProfileTypeChange={onProfileTypeChange}
          searchInput={searchInput}
          onSearchChange={onSearchChange}
          filters={filters}
          onFilterChange={onFilterChange}
          uniqueValues={uniqueValues}
          products={products}
          isLoading={isLoading}
          selectedProducts={selectedProducts}
          onToggleProduct={onToggleProduct}
          isAllSelected={isAllSelected}
          isNoneSelected={isNoneSelected}
          onSelectAll={onSelectAll}
          priceAdjustment={priceAdjustment}
          onBasedOnChange={onBasedOnChange}
          onModeChange={onModeChange}
          onIncrementModeChange={onIncrementModeChange}
          onAdjustmentValueChange={onAdjustmentValueChange}
          pricingProfiles={pricingProfiles}
          isLoadingProfiles={isLoadingProfiles}
          selectedProductsData={selectedProductsData}
          calculateNewPrice={calculateNewPrice}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
