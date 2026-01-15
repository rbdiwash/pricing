export function calculatePrice(
  basePrice: number,
  adjustmentType: 'fixed' | 'dynamic',
  value: number,
  increment: 'increase' | 'decrease'
): number {
  let newPrice = basePrice;
  
  if (adjustmentType === 'fixed') {
    newPrice = increment === 'increase' ? basePrice + value : basePrice - value;
  } else if (adjustmentType === 'dynamic') {
    const percentageValue = (value / 100) * basePrice;
    newPrice = increment === 'increase' ? basePrice + percentageValue : basePrice - percentageValue;
  }
  
  return Math.max(newPrice, 0); // Ensure price doesn't go negative
}
