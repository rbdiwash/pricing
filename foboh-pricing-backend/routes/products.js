const product = require("../data/product");
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const { search, category, subCategory, brand, segment } = req.query;
    let results = product;

    if (search) {
        results = results.filter(arg => arg?.title?.toLowerCase().includes(search.toLowerCase())||arg?.skuCode?.toLowerCase().includes(search.toLowerCase())||arg?.brand?.toLowerCase().includes(search.toLowerCase()));
    }

    if (category) {
        results = results.filter(p=> p.category === category);
    }

    if (brand) {
        results = results.filter(p=> p.brand === brand);
    }
    if (subCategory) {
        results = results.filter(p=> p.subCategory === subCategory);
    }
    if (segment) {
        results = results.filter(p=> p.segment === segment);
    }

    res.json(results);
});

module.exports = router;
