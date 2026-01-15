import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onToggle: (productId: string) => void;
  disabled?: boolean;
}

export function ProductCard({
  product,
  selected,
  onToggle,
  disabled = false,
}: ProductCardProps) {
  return (
    <div
      className={`flex items-center p-4 border rounded-lg bg-white transition-all ${
        disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
      } ${
        selected
          ? "border-green-500 bg-green-50"
          : "border-gray-200 hover:border-green-500 hover:shadow-md"
      }`}
    >
      <input
        type="checkbox"
        id={`product-${product.id}`}
        checked={selected}
        onChange={() => !disabled && onToggle(product.id)}
        disabled={disabled}
        className={`mr-4 w-[18px] h-[18px] ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      />
      <label
        htmlFor={`product-${product.id}`}
        className="flex items-center flex-1 cursor-pointer"
      >
        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl mr-4 flex-shrink-0">
          {product.title.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-800 mb-1 truncate">
            {product.title}
          </div>
          <div className="text-sm text-gray-600">{product.skuCode}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            12 x 375ML Can Case
          </div>
        </div>
      </label>
    </div>
  );
}
