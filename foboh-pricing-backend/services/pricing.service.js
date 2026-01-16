function calculatePrice(basePrice, adjustmentType, value, increment) {
  let newPrice = basePrice;
  if (adjustmentType === "FIXED") {
    newPrice = increment === "INCREASE" ? basePrice + value : basePrice - value;
  }
  if (adjustmentType === "PERCENTAGE") {
    const percentageValue = (value / 100) * basePrice;
    newPrice =
      increment === "INCREASE"
        ? basePrice + percentageValue
        : basePrice - percentageValue;
  }
  return Math.max(newPrice, 0);
}

module.exports = {
  calculatePrice,
};
