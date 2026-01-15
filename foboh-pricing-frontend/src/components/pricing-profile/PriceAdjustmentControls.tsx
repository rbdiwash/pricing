import type { PricingProfile } from "../../hooks/usePricingProfiles";

interface PriceAdjustmentControlsProps {
  basedOn: string;
  onBasedOnChange: (value: string) => void;
  mode: "fixed" | "dynamic";
  onModeChange: (mode: "fixed" | "dynamic") => void;
  incrementMode: "increase" | "decrease";
  onIncrementModeChange: (mode: "increase" | "decrease") => void;
  adjustmentValue: number;
  onAdjustmentValueChange: (value: number) => void;
  pricingProfiles: PricingProfile[];
  isLoadingProfiles: boolean;
}

export function PriceAdjustmentControls({
  basedOn,
  onBasedOnChange,
  mode,
  onModeChange,
  incrementMode,
  onIncrementModeChange,
  adjustmentValue,
  onAdjustmentValueChange,
  pricingProfiles,
  isLoadingProfiles,
}: PriceAdjustmentControlsProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Based on
        </label>
        <select
          className="px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white text-gray-800 cursor-pointer transition-colors focus:outline-none focus:border-primary w-full max-w-xs"
          value={basedOn}
          onChange={(e) => onBasedOnChange(e.target.value)}
          disabled={isLoadingProfiles}
        >
          <option value="globalWholesalePrice">Global Wholesale Price</option>
          {pricingProfiles
            .filter((p) => p.type !== "global" && p.status !== "draft")
            .map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Set Price Adjustment Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
              <input
                type="radio"
                name="adjustmentMode"
                value="fixed"
                checked={mode === "fixed"}
                onChange={(e) => onModeChange(e.target.value as "fixed" | "dynamic")}
                className="w-4 h-4 cursor-pointer accent-primary"
              />
              <span>Fixed ($)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
              <input
                type="radio"
                name="adjustmentMode"
                value="dynamic"
                checked={mode === "dynamic"}
                onChange={(e) => onModeChange(e.target.value as "fixed" | "dynamic")}
                className="w-4 h-4 cursor-pointer accent-primary"
              />
              <span>Dynamic (%)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Set Price Adjustment Increment Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
              <input
                type="radio"
                name="incrementMode"
                value="increase"
                checked={incrementMode === "increase"}
                onChange={(e) =>
                  onIncrementModeChange(e.target.value as "increase" | "decrease")
                }
                className="w-4 h-4 cursor-pointer accent-primary"
              />
              <span>Increase +</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
              <input
                type="radio"
                name="incrementMode"
                value="decrease"
                checked={incrementMode === "decrease"}
                onChange={(e) =>
                  onIncrementModeChange(e.target.value as "increase" | "decrease")
                }
                className="w-4 h-4 cursor-pointer accent-primary"
              />
              <span>Decrease -</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adjustment Value ({mode === "fixed" ? "$" : "%"})
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={adjustmentValue}
          onChange={(e) => onAdjustmentValueChange(parseFloat(e.target.value) || 0)}
          className="px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary w-full max-w-xs"
        />
      </div>

      <p className="text-sm text-gray-600 mb-6">
        The adjusted price will be calculated from Based on Price selected above.
      </p>
    </div>
  );
}
