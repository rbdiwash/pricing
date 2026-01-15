import type { Product } from "../../types/product";

interface PricingTableProps {
  products: Product[];
  priceAdjustment: {
    mode: "fixed" | "dynamic";
    incrementMode: "increase" | "decrease";
    adjustmentValue: number;
  };
  calculateNewPrice: (product: Product) => number;
  onRefresh: () => void;
}

export function PricingTable({
  products,
  priceAdjustment,
  calculateNewPrice,
  onRefresh,
}: PricingTableProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800 m-0">
          Refresh New Price Table
        </h4>
        <button
          onClick={onRefresh}
          className="text-primary hover:text-primary/80 transition-colors p-1"
          title="Recalculate prices"
        >
          🔄
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Product Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                SKU Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Based on Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Adjustment
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[130px]">
                New Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              const basePrice = product.globalWholesalePrice;
              const newPrice = calculateNewPrice(product);
              const adjustment = newPrice - basePrice;
              const adjustmentSign =
                priceAdjustment.incrementMode === "increase" ? "+" : "-";
              const adjustmentDisplay =
                priceAdjustment.mode === "fixed"
                  ? `${adjustmentSign}$${Math.abs(adjustment).toFixed(2)}`
                  : `${adjustmentSign}${Math.abs(
                      (adjustment / basePrice) * 100
                    ).toFixed(2)}%`;

              return (
                <tr key={product.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {product.skuCode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    ${basePrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="text"
                      value={adjustmentDisplay}
                      readOnly
                      className="px-3 py-1.5 border border-green-300 bg-green-50 rounded text-sm text-gray-900 w-full max-w-[120px]"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="text"
                      value={`$${newPrice.toFixed(2)}`}
                      readOnly
                      className="px-3 py-1.5 border border-green-300 bg-green-50 rounded text-sm text-gray-900 font-medium w-full max-w-[120px]"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
