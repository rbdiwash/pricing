const products = require("../data/product");

function calculatePrice(basePrice, mode, adjustmentValue, incrementMode) {
  if (!basePrice || basePrice <= 0) {
    return 0;
  }

  let newPrice = basePrice;

  if (mode === "fixed") {
    // Fixed dollar amount adjustment
    newPrice =
      incrementMode === "increase"
        ? basePrice + adjustmentValue
        : basePrice - adjustmentValue;
  } else if (mode === "dynamic") {
    // Percentage-based adjustment
    const percentageValue = (adjustmentValue / 100) * basePrice;
    newPrice =
      incrementMode === "increase"
        ? basePrice + percentageValue
        : basePrice - percentageValue;
  }

  return Math.max(newPrice, 0); // Ensure price doesn't go negative
}

function getBasePrice(
  product,
  basedOn,
  pricingProfiles = [],
  visitedProfiles = new Set()
) {
  // If based on global wholesale price, return it directly
  if (basedOn === "globalWholesalePrice" || basedOn === "global" || !basedOn) {
    return product.globalWholesalePrice || 0;
  }

  // If based on another pricing profile, recursively calculate
  const baseProfile = pricingProfiles.find((p) => p.id === basedOn);

  if (!baseProfile) {
    // Profile not found, fallback to global wholesale price
    return product.globalWholesalePrice || 0;
  }

  // Prevent circular dependencies
  if (visitedProfiles.has(basedOn)) {
    console.warn(
      `Circular dependency detected for profile ${basedOn}, using global wholesale price`
    );
    return product.globalWholesalePrice || 0;
  }

  visitedProfiles.add(basedOn);

  // If the base profile has no price adjustment, use global wholesale price
  if (!baseProfile.priceAdjustment) {
    return product.globalWholesalePrice || 0;
  }

  // Calculate the base price using the referenced profile
  const basePrice = getBasePrice(
    product,
    baseProfile.priceAdjustment.basedOn,
    pricingProfiles,
    visitedProfiles
  );

  // Apply the base profile's adjustment
  return calculatePrice(
    basePrice,
    baseProfile.priceAdjustment.mode,
    baseProfile.priceAdjustment.adjustmentValue,
    baseProfile.priceAdjustment.incrementMode
  );
}

function calculateAdjustedPrice(
  product,
  pricingProfile,
  allPricingProfiles = []
) {
  if (!pricingProfile || !pricingProfile.priceAdjustment) {
    // No adjustment configured, return global wholesale price
    return product.globalWholesalePrice || 0;
  }

  const { basedOn, mode, adjustmentValue, incrementMode } =
    pricingProfile.priceAdjustment;

  // Get the base price (could be global wholesale or from another profile)
  const basePrice = getBasePrice(
    product,
    basedOn,
    allPricingProfiles,
    new Set()
  );

  // Apply the adjustment
  return calculatePrice(basePrice, mode, adjustmentValue, incrementMode);
}

function calculatePricesForProducts(
  products,
  pricingProfile,
  allPricingProfiles = []
) {
  return products.map((product) => {
    const adjustedPrice = calculateAdjustedPrice(
      product,
      pricingProfile,
      allPricingProfiles
    );

    return {
      ...product,
      adjustedPrice,
      basePrice: getBasePrice(
        product,
        pricingProfile?.priceAdjustment?.basedOn || "globalWholesalePrice",
        allPricingProfiles,
        new Set()
      ),
    };
  });
}

module.exports = {
  calculatePrice,
  getBasePrice,
  calculateAdjustedPrice,
  calculatePricesForProducts,
};
