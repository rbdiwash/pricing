const express = require("express");
const router = express.Router();

// In-memory storage for pricing profiles
let pricingProfiles = [
  {
    id: "1",
    name: "Global Wholesale Price",
    type: "global",
    createdAt: new Date().toISOString(),
  },
];

// Get all pricing profiles
router.get("/", (req, res) => {
  res.json(pricingProfiles);
});

// Get a single pricing profile
router.get("/:id", (req, res) => {
  const profile = pricingProfiles.find((p) => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ error: "Pricing profile not found" });
  }
  res.json(profile);
});

// Create a new pricing profile
router.post("/", (req, res) => {
  const { name, profileType, selectedProducts, priceAdjustment } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Profile name is required" });
  }

  const newProfile = {
    id: String(pricingProfiles.length + 1),
    name,
    profileType,
    selectedProducts: Array.from(selectedProducts || []),
    priceAdjustment,
    createdAt: new Date().toISOString(),
    status: "draft",
  };

  pricingProfiles.push(newProfile);
  res.status(201).json(newProfile);
});

// Update a pricing profile
router.put("/:id", (req, res) => {
  const profileIndex = pricingProfiles.findIndex((p) => p.id === req.params.id);
  if (profileIndex === -1) {
    return res.status(404).json({ error: "Pricing profile not found" });
  }

  const { name, profileType, selectedProducts, priceAdjustment, status } =
    req.body;
  pricingProfiles[profileIndex] = {
    ...pricingProfiles[profileIndex],
    ...(name && { name }),
    ...(profileType && { profileType }),
    ...(selectedProducts && { selectedProducts: Array.from(selectedProducts) }),
    ...(priceAdjustment && { priceAdjustment }),
    ...(status && { status }),
    updatedAt: new Date().toISOString(),
  };

  res.json(pricingProfiles[profileIndex]);
});

// Delete a pricing profile
router.delete("/:id", (req, res) => {
  const profileIndex = pricingProfiles.findIndex((p) => p.id === req.params.id);
  if (profileIndex === -1) {
    return res.status(404).json({ error: "Pricing profile not found" });
  }

  pricingProfiles.splice(profileIndex, 1);
  res.status(204).send();
});

module.exports = router;
