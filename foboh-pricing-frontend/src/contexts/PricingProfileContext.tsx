import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { PricingProfileType } from "../types/product";

export type PriceAdjustmentMode = "fixed" | "dynamic";
export type AdjustmentIncrementMode = "increase" | "decrease";
export type BasedOnPriceType =
  | "globalWholesalePrice"
  | "retailPrice"
  | "costPrice";

interface PricingProfileState {
  profileType: PricingProfileType;
  selectedProducts: Set<string>;
  searchQuery: string;
  filters: {
    category?: string;
    brand?: string;
    segment?: string;
  };
  priceAdjustment: {
    basedOn: BasedOnPriceType;
    mode: PriceAdjustmentMode;
    incrementMode: AdjustmentIncrementMode;
    adjustmentValue: number;
  };
}

interface PricingProfileContextType {
  state: PricingProfileState;
  setProfileType: (type: PricingProfileType) => void;
  toggleProduct: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  selectAll: (productIds: string[]) => void;
  deselectAll: () => void;
  clearFilters: () => void;
  setBasedOn: (basedOn: BasedOnPriceType) => void;
  setAdjustmentMode: (mode: PriceAdjustmentMode) => void;
  setIncrementMode: (mode: AdjustmentIncrementMode) => void;
  setAdjustmentValue: (value: number) => void;
}

const initialState: PricingProfileState = {
  profileType: "multiple",
  selectedProducts: new Set(),
  searchQuery: "",
  filters: {},
  priceAdjustment: {
    basedOn: "globalWholesalePrice",
    mode: "fixed",
    incrementMode: "decrease",
    adjustmentValue: 0,
  },
};

const PricingProfileContext = createContext<
  PricingProfileContextType | undefined
>(undefined);

export function PricingProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PricingProfileState>(initialState);

  const setProfileType = useCallback((type: PricingProfileType) => {
    setState((prev) => {
      // If switching to "all", we'll handle selection in component (it has access to products)
      // For "one", clear all selections except the first one if any
      let newSelected = prev.selectedProducts;
      if (type === "one" && prev.selectedProducts.size > 1) {
        // Keep only the first selected product
        const firstSelected = Array.from(prev.selectedProducts)[0];
        newSelected = new Set([firstSelected]);
      }
      return { ...prev, profileType: type, selectedProducts: newSelected };
    });
  }, []);

  const toggleProduct = useCallback((productId: string) => {
    setState((prev) => {
      // Handle "all" mode: prevent manual changes (auto-managed)
      if (prev.profileType === "all") {
        return prev;
      }

      // Handle "one" mode: only allow one selection
      if (prev.profileType === "one") {
        const isSelected = prev.selectedProducts.has(productId);
        // If clicking the selected one, deselect it. Otherwise, select only this one.
        return {
          ...prev,
          selectedProducts: isSelected ? new Set() : new Set([productId]),
        };
      }

      // Handle "multiple" mode: normal toggle behavior
      const newSelected = new Set(prev.selectedProducts);
      if (newSelected.has(productId)) {
        newSelected.delete(productId);
      } else {
        newSelected.add(productId);
      }
      return { ...prev, selectedProducts: newSelected };
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const selectAll = useCallback((productIds: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedProducts: new Set(productIds),
    }));
  }, []);

  const deselectAll = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedProducts: new Set(),
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: {},
      searchQuery: "",
    }));
  }, []);

  const setBasedOn = useCallback((basedOn: BasedOnPriceType) => {
    setState((prev) => ({
      ...prev,
      priceAdjustment: { ...prev.priceAdjustment, basedOn },
    }));
  }, []);

  const setAdjustmentMode = useCallback((mode: PriceAdjustmentMode) => {
    setState((prev) => ({
      ...prev,
      priceAdjustment: { ...prev.priceAdjustment, mode },
    }));
  }, []);

  const setIncrementMode = useCallback((mode: AdjustmentIncrementMode) => {
    setState((prev) => ({
      ...prev,
      priceAdjustment: { ...prev.priceAdjustment, incrementMode: mode },
    }));
  }, []);

  const setAdjustmentValue = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      priceAdjustment: { ...prev.priceAdjustment, adjustmentValue: value },
    }));
  }, []);

  return (
    <PricingProfileContext.Provider
      value={{
        state,
        setState,
        setProfileType,
        toggleProduct,
        setSearchQuery,
        selectAll,
        deselectAll,
        clearFilters,
        setBasedOn,
        setAdjustmentMode,
        setIncrementMode,
        setAdjustmentValue,
      }}
    >
      {children}
    </PricingProfileContext.Provider>
  );
}

export function usePricingProfile() {
  const context = useContext(PricingProfileContext);
  if (context === undefined) {
    throw new Error(
      "usePricingProfile must be used within a PricingProfileProvider"
    );
  }
  return context;
}
