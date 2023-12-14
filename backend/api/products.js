const express = require("express");
const router = express.Router();
const ProductsService = require("../services/ProductsService");

router.get("/", async (req, res) => {
  const products = await ProductsService.getAllSortedById();

  res.status(200).json(products);
});

module.exports = router;
