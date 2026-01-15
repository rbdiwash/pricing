import { useQuery } from "@tanstack/react-query";
import type { Product, ProductFilters } from "../types/product";

const API_BASE_URL = "http://localhost:3000/api/v1";

async function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const queryParams = new URLSearchParams();

  if (filters.search) queryParams.append("search", filters.search);
  if (filters.category) queryParams.append("category", filters.category);
  if (filters.brand) queryParams.append("brand", filters.brand);
  if (filters.segment) queryParams.append("segment", filters.segment);
  if (filters.subCategory)
    queryParams.append("subCategory", filters.subCategory);

  const url = `${API_BASE_URL}/products${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 30000, // 30 seconds
  });
}
