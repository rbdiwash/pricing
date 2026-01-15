import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:3000/api/v1";

export interface PricingProfile {
  id: string;
  name: string;
  type?: string;
  profileType?: string;
  selectedProducts?: string[];
  priceAdjustment?: any;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

async function fetchPricingProfiles(): Promise<PricingProfile[]> {
  const response = await fetch(`${API_BASE_URL}/pricing-profiles`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pricing profiles: ${response.statusText}`);
  }
  return response.json();
}

async function createPricingProfile(
  data: Partial<PricingProfile>
): Promise<PricingProfile> {
  const response = await fetch(`${API_BASE_URL}/pricing-profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create pricing profile: ${response.statusText}`);
  }
  return response.json();
}

async function updatePricingProfile(
  id: string,
  data: Partial<PricingProfile>
): Promise<PricingProfile> {
  const response = await fetch(`${API_BASE_URL}/pricing-profiles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update pricing profile: ${response.statusText}`);
  }
  return response.json();
}

export function usePricingProfiles() {
  return useQuery({
    queryKey: ["pricing-profiles"],
    queryFn: fetchPricingProfiles,
    staleTime: 30000,
  });
}

export function useCreatePricingProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPricingProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-profiles"] });
      toast.success("Pricing profile created successfully");
      window.location.replace("/");
    },
  });
}

export function useUpdatePricingProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PricingProfile> }) =>
      updatePricingProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-profiles"] });
    },
  });
}
