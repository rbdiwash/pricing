import type { Product } from "../../types/product";

interface ProductPricingSummaryProps {
  selectedProducts: Product[];
  selectedCount: number;
  priceAdjustment: {
    mode: "fixed" | "dynamic";
    incrementMode: "increase" | "decrease";
    adjustmentValue: number;
  };
  onMakeChanges: () => void;
}

export function ProductPricingSummary({
  selectedProducts,
  selectedCount,
  priceAdjustment,
  onMakeChanges,
}: ProductPricingSummaryProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        {selectedCount > 0 ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-2">
                {selectedProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-white"
                  >
                    {product.title.charAt(0)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-800 m-0">
                  You've selected{" "}
                  <strong className="font-semibold">
                    {selectedCount} Product{selectedCount !== 1 ? "s" : ""}
                  </strong>
                </p>
                <p className="text-sm font-semibold text-gray-900 m-0 mt-1">
                  {selectedProducts
                    .slice(0, 2)
                    .map((p) => p.brand)
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .join(" & ") || selectedProducts[0]?.title || ""}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 m-0">
              With Price Adjustment Mode set to{" "}
              <strong className="font-semibold text-gray-800">
                {priceAdjustment.mode === "fixed" ? "Fixed" : "Dynamic"}{" "}
                {priceAdjustment.incrementMode === "increase"
                  ? "Increase"
                  : "Decrease"}
              </strong>{" "}
              of{" "}
              <strong className="font-semibold text-gray-800">
                {priceAdjustment.mode === "fixed" ? "$" : ""}
                {priceAdjustment.adjustmentValue}
                {priceAdjustment.mode === "dynamic" ? "%" : ""}
              </strong>
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-600 m-0">
            No products selected. Click "Make Changes" to select products.
          </p>
        )}
      </div>
      <button
        onClick={onMakeChanges}
        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-800 text-sm cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-gray-50 hover:border-gray-400 flex-shrink-0"
      >
        <span>✏️</span> Make Changes
      </button>
    </div>
  );
}
