import type { PricingProfileType } from "../../types/product";

interface ProfileTypeSelectorProps {
  profileType: PricingProfileType;
  onProfileTypeChange: (type: PricingProfileType) => void;
}

export function ProfileTypeSelector({
  profileType,
  onProfileTypeChange,
}: ProfileTypeSelectorProps) {
  return (
    <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200 flex-wrap">
      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
        <input
          type="radio"
          name="profileType"
          value="one"
          checked={profileType === "one"}
          onChange={(e) => onProfileTypeChange(e.target.value as PricingProfileType)}
          className="w-[18px] h-[18px] cursor-pointer accent-primary"
        />
        <span>One Product</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
        <input
          type="radio"
          name="profileType"
          value="multiple"
          checked={profileType === "multiple"}
          onChange={(e) => onProfileTypeChange(e.target.value as PricingProfileType)}
          className="w-[18px] h-[18px] cursor-pointer accent-primary"
        />
        <span>Multiple Products</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
        <input
          type="radio"
          name="profileType"
          value="all"
          checked={profileType === "all"}
          onChange={(e) => onProfileTypeChange(e.target.value as PricingProfileType)}
          className="w-[18px] h-[18px] cursor-pointer accent-primary"
        />
        <span>All Products</span>
      </label>
    </div>
  );
}
