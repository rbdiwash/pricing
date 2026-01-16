import { useMemo, useState, useEffect } from "react";
import {
  usePricingProfile,
  type BasedOnPriceType,
} from "../contexts/PricingProfileContext";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import { calculatePrice } from "../utils/priceCalculation";
import { useDebounce } from "../hooks/useDebounce";
import { subCategories, segments, brands } from "../consts/const";
import {
  usePricingProfiles,
  useCreatePricingProfile,
} from "../hooks/usePricingProfiles";
import { BasicPricingProfileSection } from "./pricing-profile/BasicPricingProfileSection";
import { ProductPricingSection } from "./pricing-profile/ProductPricingSection";
import { AssignCustomersSection } from "./pricing-profile/AssignCustomersSection";
import { NavigationFooter } from "./pricing-profile/NavigationFooter";
import { toast } from "react-toastify";

export function PricingProfileSetup() {
  const {
    state,
    setProfileType,
    toggleProduct,
    selectAll,
    deselectAll,
    setBasedOn,
    setAdjustmentMode,
    setIncrementMode,
    setAdjustmentValue,
    setState,
  } = usePricingProfile();

  const [searchInput, setSearchInput] = useState(state.searchQuery);
  const debouncedSearchQuery = useDebounce(searchInput, 500);

  const apiFilters = useMemo(
    () => ({
      ...state.filters,
      search: debouncedSearchQuery || undefined,
    }),
    [state.filters, debouncedSearchQuery]
  );

  const { data: products = [], isLoading } = useProducts(apiFilters);
  const { data: pricingProfiles = [], isLoading: isLoadingProfiles } =
    usePricingProfiles();
  const createProfile = useCreatePricingProfile();

  const [profileName, setProfileName] = useState("Profile Name");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-select all products when profileType is "all"
  useEffect(() => {
    if (state.profileType === "all" && products.length > 0) {
      const allProductIds = products.map((p) => p.id);
      const currentIds = Array.from(state.selectedProducts);
      if (
        allProductIds.length !== currentIds.length ||
        !allProductIds.every((id) => currentIds.includes(id))
      ) {
        selectAll(allProductIds);
      }
    }
  }, [state.profileType, products, state.selectedProducts, selectAll]);

  const selectedProductsData = useMemo(() => {
    return products.filter((p) => state.selectedProducts.has(p.id));
  }, [products, state.selectedProducts]);

  const uniqueValues = useMemo(() => {
    return {
      categories: Array.from(new Set(products.map((p) => p.category))),
      subCategories: [...subCategories],
      segments: [...segments],
      brands: [...brands],
    };
  }, [products]);

  const handleSelectAll = () => {
    if (state.profileType === "all") {
      return;
    }

    if (
      state.selectedProducts.size === products?.length &&
      products?.length > 0
    ) {
      deselectAll();
    } else {
      selectAll(products?.map((p) => p.id) || []);
    }
  };

  const handleFilterChange = (
    key: "category" | "brand" | "segment" | "subCategory",
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value || undefined,
      },
    }));
  };

  const handleBasedOnChange = (value: string) => {
    setBasedOn(value as BasedOnPriceType);
  };

  const isAllSelected =
    state.selectedProducts.size === products?.length && products?.length > 0;
  const isNoneSelected = state.selectedProducts.size === 0;

  const calculateNewPrice = (product: Product): number => {
    const basePrice = product.globalWholesalePrice;
    return calculatePrice(
      basePrice,
      state.priceAdjustment.mode,
      state.priceAdjustment.adjustmentValue,
      state.priceAdjustment.incrementMode
    );
  };

  const handleRefresh = () => {
    // Force recalculation - prices are already calculated reactively
  };

  const handleSaveDraft = async () => {
    if (state.selectedProducts.size === 0) {
      setSaveMessage("Please select at least one product");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    setIsSaving(true);
    try {
      const profileData = {
        name: profileName,
        profileType: state.profileType,
        selectedProducts: Array.from(state.selectedProducts),
        priceAdjustment: state.priceAdjustment,
        status: "draft",
      };

      await createProfile.mutateAsync(profileData);
      setSaveMessage("Profile saved as draft successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Failed to save profile");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Moving from step 1 to step 2
      if (state.selectedProducts.size === 0) {
        setSaveMessage("Please select at least one product before proceeding");
        setTimeout(() => setSaveMessage(""), 3000);
        return;
      }

      setIsSaving(true);
      try {
        setCurrentStep(2);
        toast.success("Profile saved! Proceeding to customer assignment...");
        setTimeout(() => setSaveMessage(""), 3000);
      } catch (error) {
        toast.error("Failed to save profile. Please try again.");
        setTimeout(() => setSaveMessage(""), 3000);
      } finally {
        setIsSaving(false);
      }
    } else if (currentStep === 2) {
      // On step 2, "Save & Publish Profile"
      setIsSaving(true);
      try {
        const profileData = {
          name: profileName,
          profileType: state.profileType,
          selectedProducts: Array.from(state.selectedProducts),
          priceAdjustment: state.priceAdjustment,
          status: "published", // Actually publish the profile
        };

        await createProfile.mutateAsync(profileData);
        setSaveMessage("Profile published successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
        // Could navigate away or show success message
      } catch (error) {
        setSaveMessage("Failed to publish profile. Please try again.");
        setTimeout(() => setSaveMessage(""), 3000);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-start mb-8 gap-8 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 m-0 mb-2">
            Pricing Profile {">"} Setup a Profile
          </h2>
          <p className="text-gray-600 text-sm m-0">
            Setup your pricing profile, select products and assign customers.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0 relative">
          <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-800 text-sm font-medium cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={true}
            className="px-5 py-2.5 bg-primary border border-primary rounded-md text-white text-sm font-medium cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save as Draft"}
          </button>
          {saveMessage && (
            <div className="absolute top-16 right-8 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
              {saveMessage}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <BasicPricingProfileSection
          profileName={profileName}
          onProfileNameChange={setProfileName}
        />

        {currentStep < 2 && (
          <ProductPricingSection
            currentStep={currentStep}
            selectedCount={state.selectedProducts.size}
            selectedProducts={state.selectedProducts}
            selectedProductsData={selectedProductsData}
            priceAdjustment={state.priceAdjustment}
            onMakeChanges={() => setCurrentStep(1)}
            profileType={state.profileType}
            onProfileTypeChange={setProfileType}
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            filters={state.filters}
            onFilterChange={handleFilterChange}
            uniqueValues={uniqueValues}
            products={products}
            isLoading={isLoading}
            onToggleProduct={toggleProduct}
            isAllSelected={isAllSelected}
            isNoneSelected={isNoneSelected}
            onSelectAll={handleSelectAll}
            onBasedOnChange={handleBasedOnChange}
            onModeChange={setAdjustmentMode}
            onIncrementModeChange={setIncrementMode}
            onAdjustmentValueChange={setAdjustmentValue}
            pricingProfiles={pricingProfiles}
            isLoadingProfiles={isLoadingProfiles}
            calculateNewPrice={calculateNewPrice}
            onRefresh={handleRefresh}
          />
        )}

        {currentStep >= 2 && (
          <ProductPricingSection
            currentStep={currentStep}
            selectedCount={state.selectedProducts.size}
            selectedProducts={state.selectedProducts}
            selectedProductsData={selectedProductsData}
            priceAdjustment={state.priceAdjustment}
            onMakeChanges={() => setCurrentStep(1)}
            profileType={state.profileType}
            onProfileTypeChange={setProfileType}
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            filters={state.filters}
            onFilterChange={handleFilterChange}
            uniqueValues={uniqueValues}
            products={products}
            isLoading={isLoading}
            onToggleProduct={toggleProduct}
            isAllSelected={isAllSelected}
            isNoneSelected={isNoneSelected}
            onSelectAll={handleSelectAll}
            onBasedOnChange={handleBasedOnChange}
            onModeChange={setAdjustmentMode}
            onIncrementModeChange={setIncrementMode}
            onAdjustmentValueChange={setAdjustmentValue}
            pricingProfiles={pricingProfiles}
            isLoadingProfiles={isLoadingProfiles}
            calculateNewPrice={calculateNewPrice}
            onRefresh={handleRefresh}
          />
        )}

        {currentStep < 2 && (
          <NavigationFooter
            currentStep={currentStep}
            isSaving={isSaving}
            canProceed={
              currentStep === 1 ? state.selectedProducts.size > 0 : true
            }
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {currentStep < 2 && (
          <AssignCustomersSection currentStep={currentStep} />
        )}

        {currentStep >= 2 && (
          <NavigationFooter
            currentStep={currentStep}
            isSaving={isSaving}
            canProceed={true}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
