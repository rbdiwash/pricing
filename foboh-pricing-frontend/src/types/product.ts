export interface Product {
  id: string;
  title: string;
  skuCode: string;
  brand: string;
  category: string;
  subCategory: string;
  segment: string;
  globalWholesalePrice: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  segment?: string;
  subCategory?: string;
}

export type PricingProfileType = "one" | "multiple" | "all";
